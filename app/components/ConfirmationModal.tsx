"use client";
import { Button } from "@/components/ui/button";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  actionButton?: React.ReactNode;
  title: string;
  description?: string;
  onOkClick?: () => void;
};

export default function ConfirmationModal({
  isOpen,
  setIsOpen,
  onOkClick,
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
      className="z-[99] fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="max-w-[90%] sm:max-w-lg w-full bg-white p-6 sm:p-8 rounded-lg shadow-xl transform duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
          {description && (
            <Description className="text-gray-600 mt-2 text-sm sm:text-base">
              {description}
            </Description>
          )}
          {children}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={() => (onOkClick && onOkClick()) || setIsOpen(false)}
              className="font-medium transition duration-300"
            >
              Ok
            </Button>
            {actionButton && <div className="ml-2">{actionButton}</div>}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
