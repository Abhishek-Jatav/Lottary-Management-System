import { Toaster } from "react-hot-toast";
import BackendGate from "@/hooks/backendCheck/BackendGate";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0F19] text-[#E6EDF3] antialiased">
        {/* Main App */}
        <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#020617]">
          {/* <BackendGate>{children}</BackendGate> */}
          {children}
        </div>

        {/* Premium Toaster */}
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111827",
              color: "#E5E7EB",
              border: "1px solid #1F2937",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
            },

            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#0B0F19",
              },
              style: {
                border: "1px solid rgba(34,197,94,0.3)",
              },
            },

            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#0B0F19",
              },
              style: {
                border: "1px solid rgba(239,68,68,0.3)",
              },
            },

            loading: {
              iconTheme: {
                primary: "#3B82F6",
                secondary: "#0B0F19",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
