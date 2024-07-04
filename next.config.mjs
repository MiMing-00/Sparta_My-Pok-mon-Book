/** @type {import('next').NextConfig} */
// "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/105.png"
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
    ],
  },
};

export default nextConfig;
