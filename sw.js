const cacheName = 'poker planning v0.2';
const filesToCache = [
    '/',
    '/index.html',

    '/favicon.ico',

    '/styles/style.css',

    '/scripts/app.js',
    '/scripts/gsap.min.js',

    '/assets/images/logo-192x192.png',
    '/assets/images/logo-512x512.png',

    '/assets/flaticon/flaticon.css',
    '/assets/flaticon/flaticon.html',
    '/assets/flaticon/Flaticon.eot',
    '/assets/flaticon/Flaticon.svg',
    '/assets/flaticon/Flaticon.ttf',
    '/assets/flaticon/Flaticon.woff',
    '/assets/flaticon/Flaticon.woff2',

    '/assets/fonts/Barlow-Bold.ttf',
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
