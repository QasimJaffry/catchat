"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Cat {
  id: string;
  name: string;
  personality: string;
  scenario: string;
  // Add other cat properties as needed
}

interface CatContextProps {
  selectedCat: Cat | null;
  setSelectedCat: (cat: Cat | null) => void;
}

const CatContext = createContext<CatContextProps | undefined>(undefined);

export const CatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  return (
    <CatContext.Provider value={{ selectedCat, setSelectedCat }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error("useCat must be used within a CatProvider");
  }
  return context;
};
