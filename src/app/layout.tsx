import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "404: Portfolio not found",
  description: "Yeah so this is of course just a joke as this is my portfolio itself"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
