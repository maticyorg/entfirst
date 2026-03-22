import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enterprise First | AI-Powered Enterprise Solutions",
  description:
    "Enterprise First AB delivers cutting-edge AI solutions built for enterprise scale. Transform your business with intelligent automation and data-driven insights.",
  openGraph: {
    title: "Enterprise First | AI-Powered Enterprise Solutions",
    description:
      "Transform your enterprise with AI. Enterprise First AB — where intelligent technology meets business strategy.",
    url: "https://enterprisefirst.ai",
    siteName: "Enterprise First",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
