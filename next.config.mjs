import mdx from "@next/mdx";

/**
 * Enable MDX support
 */
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/**
 * Next.js configuration
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    // Disable Next.js Image Optimization to avoid hostname validation issues
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.dagomirwojcik.com",
        pathname: "/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
