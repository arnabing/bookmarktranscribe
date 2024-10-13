/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    transpilePackages: ['@chakra-ui/react', '@chakra-ui/icons', 'react-icons'],
}

module.exports = nextConfig
