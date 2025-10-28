/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'cautious-space-goldfish-j6jrrqg9gjr3ppxg-3000.app.github.dev/',
        'localhost:3000',
        'agro-finance-real.vercel.app/',
        'agro-finance-real-git-developer-helcioanicios-projects.vercel.app/',
      ],
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
