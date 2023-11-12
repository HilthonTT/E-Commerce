import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const FORMAT = "MMMM do, yyyy";

const SizesPage = async ({ params }: BillboardsPageProps) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedsizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, FORMAT),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedsizes} />
      </div>
    </div>
  );
};

export default SizesPage;
