import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
        store: {
          userId,
        },
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
        store: {
          userId,
        },
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
