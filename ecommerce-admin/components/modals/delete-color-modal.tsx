"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export const DeleteColorModal = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { isOpen, onClose, type, data } = useModal();
  const { colorId, storeId } = data;

  const isModalOpen = isOpen && type === "deleteColor";

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${storeId}/colors/${colorId}`);

      router.refresh();
      window.location.href = `/${storeId}/colors`;

      onClose();
      toast.success("Color deleted.");
    } catch (error) {
      console.log(error);
      toast.error(
        "Make sure you removed all the products using this color first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isModalOpen}
      onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
