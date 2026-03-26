import { Toaster } from "react-hot-toast";
import BackendGate from "@/hooks/backendCheck/BackendGate";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BackendGate>{children}</BackendGate>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
