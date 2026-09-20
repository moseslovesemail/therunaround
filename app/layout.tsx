import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Runaround — NZ systems, translated",
  description: "Free, source-backed tools to help New Zealanders complain, dispute, request records and escalate ridiculous systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ">
      <body>{children}</body>
    </html>
  );
}
