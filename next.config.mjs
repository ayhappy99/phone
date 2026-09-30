/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/phone",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
