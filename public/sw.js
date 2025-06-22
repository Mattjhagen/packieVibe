// public/sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pacmac-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/aboutme.js',
        '/assets/icon-192.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});