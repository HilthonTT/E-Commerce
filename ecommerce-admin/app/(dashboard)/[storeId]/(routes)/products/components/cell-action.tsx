"use client";

import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { ProductColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();

  const router = useRouter();
  const params = useParams();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);

    toast.success("Product ID copied to the clipboard.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            onOpen("deleteProduct", {
              productId: data.id,
              storeId: params.storeId as string,
            })
          }>
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
