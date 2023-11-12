import { auth } from "@clerk/nextjs";
import { BillboardClient } from "./components/client";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

const BillboardsPage = ({ params }: BillboardsPageProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
