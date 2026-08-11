const CACHE_NAME = 'marbles-local-v3';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png',
  'menu_bg.jpg',
  '1.png',
  '6.png',
  'grass.jpg',
  'carpet.jpg',
  'asphalt.jpg',
  'cement.jpg',
  'dirt.jpg',
  'https://jsdelivr.net'
];

// ذخیره‌سازی فوری فایل‌ها در هارد گوشی هنگام اولین اتصال
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// خواندن و اجرای سریع فایل‌ها از حافظه گوشی در حالت ۱۰۰٪ آفلاین
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
