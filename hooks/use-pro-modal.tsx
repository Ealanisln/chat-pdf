import { create } from "zustand";

interface useProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => {
  let isOpen = false; // Use a ref to track the modal's state

  return {
    isOpen,
    onOpen: () => {
      if (!isOpen) { // Check if the modal is not already open
        isOpen = true;
        set({ isOpen: true });
      }
    },
    onClose: () => {
      isOpen = false;
      set({ isOpen: false });
    },
  };
});
