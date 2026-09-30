// Kill switch for any service worker left behind by the old WordPress site.
// Served at the common service worker paths (see next.config.ts rewrites), so
// a browser that still has the old worker registered fetches this on its next
// update check, installs it, and it wipes every cache, unregisters itself, and
// reloads the open tabs onto the live site.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => caches.delete(k)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      for (const client of clients) client.navigate(client.url)
    })(),
  )
})
