"use client";

import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal-store";

const SetupPage = () => {
  const { onOpen, isOpen } = useModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen("createStore");
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
