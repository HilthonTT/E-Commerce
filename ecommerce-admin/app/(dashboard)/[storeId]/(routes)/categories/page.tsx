import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

interface CategoriresPageProps {
  params: {
    storeId: string;
  };
}

const FORMAT = "MMMM do, yyyy";

const CategoriesPage = async ({ params }: CategoriresPageProps) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, FORMAT),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
