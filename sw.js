const CACHE_NAME = 'marble-stadium-v1';
const ASSETS = ['index.html', 'manifest.json', '6.png', '1.png', 'emerald.png', 'ruby.png', 'cobalt.png', 'gold.png', 'grass.jpg', 'carpet.jpg', 'asphalt.jpg', 'cement.jpg', 'dirt.jpg', 'menu_bg.jpg'];
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
