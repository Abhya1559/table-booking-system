"use client";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  actionButton?: React.ReactNode;
  title: string;
  description?: string;
};

export default function Modal({
  isOpen,
  setIsOpen,
  actionButton,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="z-[55] fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative max-w-lg w-full bg-white p-8 rounded-lg shadow-xl transform duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div
            className="absolute top-3 right-2  p-1 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <XIcon size={18} className="text-gray-500 hover:text-red-500 " />
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
          {description && (
            <Description className="text-gray-600 mt-2">
              {description}
            </Description>
          )}
          {children}
          <div className="mt-6 flex justify-end gap-4">
            {/* <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 font-medium transition duration-300"
            >
              Cancel
            </button> */}
            {actionButton && <div className="ml-2">{actionButton}</div>}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
