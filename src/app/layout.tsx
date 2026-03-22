import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://enterprisefirst.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Enterprise First | AI assets & media intelligence",
    template: "%s | Enterprise First",
  },
  description:
    "Stockholm-based AI consultancy. Content-to-page, brand surveillance, event context, media intelligence for agencies, and segment capture apps—powered by one media intelligence engine.",
  keywords: [
    "AI consultancy",
    "media intelligence",
    "brand monitoring",
    "Stockholm",
    "Enterprise First",
    "enterprisefirst.ai",
    "content as a service",
  ],
  authors: [{ name: "Enterprise First AB" }],
  creator: "Enterprise First AB",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Enterprise First",
    title: "Enterprise First | AI assets & media intelligence",
    description:
      "AI consultancy services for content, brand surveillance, events, media agencies, and customer segments\u2014powered by a unified intelligence engine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise First | AI assets & media intelligence",
    description:
      "AI consultancy services for content, brand surveillance, events, media agencies, and customer segments.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enterprise First AB",
  alternateName: "enterprisefirst.ai",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "AI consultancy delivering media intelligence and AI assets as a service from Stockholm, Sweden.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stockholm",
    addressCountry: "SE",
  },
  sameAs: [] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Enterprise First",
  url: siteUrl,
  publisher: {
    "@type": "Organization",
    name: "Enterprise First AB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
