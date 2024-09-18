/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
