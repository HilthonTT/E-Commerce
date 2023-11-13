import { create } from "zustand";

export type ModalType =
  | "createStore"
  | "deleteStore"
  | "deleteBillboard"
  | "deleteCategory"
  | "deleteSize"
  | "deleteColor";

interface ModalData {
  billboardId?: string;
  storeId?: string;
  categoryId?: string;
  sizeId?: string;
  colorId?: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type: ModalType, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
