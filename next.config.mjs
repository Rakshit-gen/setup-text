/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
    swcPlugins:[
    ['next-superjson-plugin',{}]
    ],
    images: {
        domains: [
          'res.cloudinary.com', 
          'avatars.githubusercontent.com',
          'lh3.googleusercontent.com'
        ]
      }
};

export default nextConfig;
