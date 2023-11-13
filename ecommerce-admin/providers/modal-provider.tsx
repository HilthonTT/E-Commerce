"use client";

import { useEffect, useState } from "react";

import { CreateStoreModal } from "@/components/modals/create-store-modal";
import { DeleteStoreModal } from "@/components/modals/delete-store-modal";
import { DeleteBillboardModal } from "@/components/modals/delete-billboard-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";
import { DeleteSizeModal } from "@/components/modals/delete-size-modal";
import { DeleteColorModal } from "@/components/modals/delete-color-modal";
import { DeleteProductModal } from "@/components/modals/delete-product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateStoreModal />
      <DeleteStoreModal />
      <DeleteBillboardModal />
      <DeleteCategoryModal />
      <DeleteSizeModal />
      <DeleteColorModal />
      <DeleteProductModal />
    </>
  );
};
