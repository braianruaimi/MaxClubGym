import type { Metadata, Viewport } from "next";
import { InstallPrompt } from "@/components/InstallPrompt";
import "./globals.css";

const repoName = "MaxClubGym";
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${repoName}` : "";
const siteUrl = `https://braianruaimi.github.io${basePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MaxClubGym",
    template: "%s | MaxClubGym",
  },
  description:
    "PWA estatica de alto rendimiento para MaxClubGym, optimizada para SEO, moviles y despliegue en GitHub Pages.",
  applicationName: "MaxClubGym",
  manifest: `${basePath}/manifest.json`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MaxClubGym",
    description:
      "Experiencia web premium, instalable y veloz para presentar planes, clases y reservas.",
    url: siteUrl,
    siteName: "MaxClubGym",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxClubGym",
    description:
      "PWA estatica con SEO fuerte y despliegue automatico en GitHub Pages.",
  },
  icons: {
    icon: `${basePath}/icon.svg`,
    apple: `${basePath}/apple-touch-icon.svg`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MaxClubGym",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
