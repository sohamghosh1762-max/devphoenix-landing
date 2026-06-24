"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ConnectFlow = "student" | "client" | "select";

interface ConnectModalContextType {
  isOpen: boolean;
  initialFlow: ConnectFlow;
  openModal: (flow?: ConnectFlow) => void;
  closeModal: () => void;
}

const ConnectModalContext = createContext<ConnectModalContextType | undefined>(
  undefined
);

export function ConnectModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialFlow, setInitialFlow] = useState<ConnectFlow>("select");

  const openModal = (flow: ConnectFlow = "select") => {
    setInitialFlow(flow);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ConnectModalContext.Provider
      value={{ isOpen, initialFlow, openModal, closeModal }}
    >
      {children}
    </ConnectModalContext.Provider>
  );
}

export function useConnectModal() {
  const context = useContext(ConnectModalContext);
  if (context === undefined) {
    throw new Error("useConnectModal must be used within a ConnectModalProvider");
  }
  return context;
}
