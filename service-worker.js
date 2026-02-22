const CACHE_NAME = 'mixplay-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './file_000000009aac71f5a38536be785d2478.png'
];

// INSTALAÇÃO
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ATIVAR
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// FETCH (OFFLINE FUNCIONAL)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
