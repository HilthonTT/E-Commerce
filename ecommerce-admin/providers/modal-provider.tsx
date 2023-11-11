"use client";

import { useEffect, useState } from "react";

import { CreateStoreModal } from "@/components/modals/create-store-modal";
import { DeleteStoreModal } from "@/components/modals/delete-store-modal";
import { DeleteBillboardModal } from "@/components/modals/delete-billboard-modal";

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
    </>
  );
};
