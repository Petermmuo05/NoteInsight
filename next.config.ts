/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fteoiycekhmzhyyohsbk.supabase.co',
        pathname: '/storage/v1/object/public/**', // Optional: Restrict to public storage paths
      },
    ],
  },
};

export default nextConfig;
