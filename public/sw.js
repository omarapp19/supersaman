const CACHE_NAME = 'saman-pwa-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install event - precache the core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching App Shell');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches to prevent stale data
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - intercept requests to serve cached assets when offline
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS GET requests (e.g. ignore chrome-extension, etc.)
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin) && !event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Bypass dynamic APIs like Firebase or Google services (always fetch from network)
  const isDynamicAPI = url.hostname.includes('firebase') || 
                        url.hostname.includes('googleapis') || 
                        url.hostname.includes('google.com');

  if (isDynamicAPI) {
    // Network only for dynamic database and authentication calls
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Network-First with Cache-Fallback strategy for same-origin resources
      return fetch(event.request)
        .then((networkResponse) => {
          // If valid response, clone and update cache
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request failed, fallback to cache
          if (cachedResponse) {
            return cachedResponse;
          }
          // If it's a navigation request and we are offline, serve index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
    })
  );
});
