/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        MODEL_URL: process.env.MODEL_URL,
    },
}

module.exports = nextConfig
