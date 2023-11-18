import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { add } from "date-fns";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }

    const session = event?.data?.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressesComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressesComponents
      .filter((c) => c !== null)
      .join(", ");

    if (event.type === "checkout.session.completed") {
      const order = await prismadb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || "",
        },
        include: {
          orderItems: true,
        },
      });

      const productIds = order.orderItems.map(
        (orderItem) => orderItem.productId
      );

      await prismadb.product.updateMany({
        where: {
          id: {
            in: [...productIds],
          },
        },
        data: {
          isArchived: true,
        },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("WEBHOOK_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
