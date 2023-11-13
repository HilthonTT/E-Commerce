import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

interface SizeIdPageProps {
  params: {
    storeId: string;
    sizeId: string;
  };
}

const SizeIdPage = async ({ params }: SizeIdPageProps) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
    include: {
      store: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizeIdPage;
