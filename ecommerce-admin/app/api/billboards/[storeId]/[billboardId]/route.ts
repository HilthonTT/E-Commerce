import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID missing", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID missing", { status: 400 });
    }

    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
        store: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_DELETE]", error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const user = await currentUser();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID missing", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID missing", { status: 400 });
    }

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
        storeId: params.storeId,
        store: {
          userId: user.id,
        },
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_PATCH]", error);
  }
}
