/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudinary is the only image host the app depends on in production —
    // Unsplash/pravatar.cc were removed once every seed/default image was
    // migrated onto this project's own Cloudinary account.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" }
    ]
  }
};
export default nextConfig;
