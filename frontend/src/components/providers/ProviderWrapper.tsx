"use client";

import React from "react";
import ReduxStoreProvider from "./ReduxStoreProvider";
import NextAuthProvider from "./NextAuthProvider";

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <ReduxStoreProvider>
        {children}
      </ReduxStoreProvider>
    </NextAuthProvider>
  );
}
