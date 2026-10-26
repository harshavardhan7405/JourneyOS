import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JourneyOS | Educational Travel Platform",
  description: "Independent educational travel management platform for immersive learning journeys.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
