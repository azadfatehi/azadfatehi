const CACHE_NAME = 'marbles-stadium-v1';
const ASSETS = [
  'index.html',
  'shop.html', // 🏪 اضافه شدن صفحه فروشگاه برای دسترسی آفلاین
  '6.png',
  '1.png',
  'grass.jpg',
  'carpet.jpg',
  'asphalt.jpg',
  'cement.jpg',
  'dirt.jpg',
  'menu_bg.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
