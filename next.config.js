/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NEXT_STRICT,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  async redirects() {
    return process.env.NEXT_MAINTENANCE_MODE === 'true' ? [
      {
        source: "/((?!maintenance.html$).*$)",
        destination: "/maintenance.html",
        permanent: false,
      }
    ] : [
      {
        source: '/top',
        destination: '/',
        permanent: true,
      },
      {
        source: '/talents',
        destination: '/talents/1',
        permanent: true,
      }
    ]
  },
  images: {
    domains: ['caspla-files.s3.ap-northeast-1.amazonaws.com', 'caspla-live.s3.ap-northeast-1.amazonaws.com']
  }
};

module.exports = nextConfig;
