"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Modal } from "@/components/modals/modal";
import { Gallery } from "@/components/gallery";
import { Info } from "@/components/info";

export const PreviewModal = () => {
  const { isOpen, onClose, data, type } = useModal();
  const { product } = data;

  const isModalOpen = isOpen && type === "preview";

  if (!product) {
    return null;
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};
