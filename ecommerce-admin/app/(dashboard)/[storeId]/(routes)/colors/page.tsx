import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";

interface ColorsPageProps {
  params: {
    storeId: string;
  };
}

const FORMAT = "MMMM do, yyyy";

const ColorsPage = async ({ params }: ColorsPageProps) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, FORMAT),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
