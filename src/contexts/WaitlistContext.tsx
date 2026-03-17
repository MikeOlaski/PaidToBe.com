import { createContext, useContext, useState, ReactNode } from "react";

interface WaitlistContextType {
  open: (source?: string) => void;
}

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}

interface Props {
  children: ReactNode;
  onOpen: (source?: string) => void;
}

export function WaitlistProvider({ children, onOpen }: Props) {
  return (
    <WaitlistContext.Provider value={{ open: onOpen }}>
      {children}
    </WaitlistContext.Provider>
  );
}
