const CACHE_NAME = "vibecode-cache-v1";
const urlsToCache = [
  '/',
  '/index.html',
  '/preview.html', // ✅ add this page
  '/style.css',
  '/aboutme.js',
  '/manifest.json', // ✅ add manifest
  '/assets/icon-192.png',
  '/assets/splash.png'
];

// Install: Precache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

// Fetch: Serve cache first, then fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
