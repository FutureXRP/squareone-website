import type { NextConfig } from 'next'

// Service worker filenames the old WordPress site (or its plugins) may have
// registered on these domains. Each one serves the kill switch.
const OLD_SERVICE_WORKERS = ['sw.js', 'service-worker.js', 'serviceworker.js', 'superpwa-sw.js', 'pwa-sw.js', 'wp-sw.js', 'firebase-messaging-sw.js', 'OneSignalSDKWorker.js']

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  async rewrites() {
    return OLD_SERVICE_WORKERS.map((file) => ({ source: `/${file}`, destination: '/kill-sw.js' }))
  },
  async headers() {
    return [
      {
        // Browsers that cached the old site: on the first HTML response from
        // the new one, drop the old caches and any leftover service worker.
        // Safe to remove a month or two after launch (see CONFIRM.md).
        source: '/:path*',
        has: [{ type: 'header', key: 'accept', value: '.*text/html.*' }],
        headers: [{ key: 'Clear-Site-Data', value: '"cache", "storage"' }],
      },
      ...['kill-sw.js', ...OLD_SERVICE_WORKERS].map((file) => ({
        source: `/${file}`,
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      })),
    ]
  },
}

export default nextConfig
