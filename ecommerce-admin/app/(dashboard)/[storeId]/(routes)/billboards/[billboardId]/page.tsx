import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

interface BillboardIdPageProps {
  params: {
    storeId: string;
    billboardId: string;
  };
}

const BillboardIdPage = async ({ params }: BillboardIdPageProps) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
    include: {
      store: true,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} store={billboard?.store!} />
      </div>
    </div>
  );
};

export default BillboardIdPage;
