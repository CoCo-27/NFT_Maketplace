/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        API_KEY: process.env.API_KEY,
    },
    images: {
        domains: ["nft-cdn.alchemy.com"], //Domain of image host
    },
};
