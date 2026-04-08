"use client";

import { Toaster } from "react-hot-toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "18px",
            background: "#18181b",
            color: "#fafafa",
            border: "1px solid rgba(255,255,255,0.08)",
          },
          success: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fafafa",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fafafa",
            },
          },
        }}
      />
    </>
  );
}