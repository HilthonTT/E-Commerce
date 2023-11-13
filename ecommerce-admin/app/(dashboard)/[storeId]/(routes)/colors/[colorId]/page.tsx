import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

interface ColorIdPageProps {
  params: {
    storeId: string;
    colorId: string;
  };
}

const ColorIdPage = async ({ params }: ColorIdPageProps) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
    include: {
      store: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorIdPage;
