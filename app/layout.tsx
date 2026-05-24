import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Key Visuals | Cinematic Content Systems",
  description:
    "Premium videography and content strategy for athletes, fitness brands, and lifestyle teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
