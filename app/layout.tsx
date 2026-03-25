import type { Metadata, Viewport } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { FloatingGymActions } from "@/components/FloatingGymActions";
import { InstallPrompt } from "@/components/InstallPrompt";
import { PWARegistration } from "@/components/PWARegistration";
import "./globals.css";

const repoName = "MaxClubGym";
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? `/${repoName}` : "";
const siteUrl = `https://braianruaimi.github.io${basePath}`;

const displayFont = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MaxClubGym",
    template: "%s | MaxClubGym",
  },
  description:
    "Centro de alta performance para entrenamiento, recuperacion activa y nutricion basada en datos. Activa tu pase de cortesia y entrena con proposito en MaxClubGym.",
  applicationName: "MaxClubGym",
  manifest: `${basePath}/manifest.json`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MaxClubGym",
    description:
      "Entrena con proposito, mide resultados y rompe tus limites con planes, recuperacion activa y nutricion personalizada.",
    url: siteUrl,
    siteName: "MaxClubGym",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaxClubGym",
    description:
      "Activa tu pase de cortesia y descubre los planes Basic, Pro y Elite de MaxClubGym.",
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
      <body className={`${displayFont.variable} ${bodyFont.variable} font-body`}>
        <PWARegistration />
        {children}
        <FloatingGymActions />
        <InstallPrompt />
      </body>
    </html>
  );
}
