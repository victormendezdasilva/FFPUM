/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Set basePath and assetPrefix to your repository name
  // This is essential for GitHub Pages deployment to a subpath
  basePath: "/FFPUM",
  assetPrefix: "/FFPUM",
  images: {
    // Disable Image Optimization API for static exports
    unoptimized: true,
  },
  // Optional: uncomment the following line if you want to remove the .html extension from URLs
  trailingSlash: true,
};

export default nextConfig;
