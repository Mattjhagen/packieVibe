// public/sw.js

const CACHE_NAME = "vibecode-cache-v1";
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/aboutme.js',
  '/assets/icon-192.png'
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});