import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // gera o site estático em /out
  trailingSlash: true,
  images: { unoptimized: true }, // sem servidor de otimização de imagens
  reactStrictMode: true,
};

export default nextConfig;
