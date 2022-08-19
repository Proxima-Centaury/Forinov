/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        images: {
            allowFutureImage: true
        }
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [ "dev.forinov.fr" ],
    }
}

module.exports = nextConfig