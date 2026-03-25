import withPWAInit from "@ducanh2912/next-pwa";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "MaxClubGym";
const basePath = isProduction ? `/${repoName}` : "";

const withPWA = withPWAInit({
  dest: "public",
  register: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  disable: !isProduction,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: isProduction ? `${basePath}/` : undefined,
};

export default withPWA(nextConfig);
