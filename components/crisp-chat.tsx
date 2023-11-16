"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b074722d-1847-4f6e-8589-9abfc34cc95b");
  }, []);

  return null;
};
