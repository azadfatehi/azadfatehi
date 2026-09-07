// نام کش
const cacheName = "tille-game-v1";

// فایل‌هایی که باید آفلاین ذخیره شوند
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./1.png",
  "./grass.jpg",
  "./sw.js"
];

// نصب سرویس‌ورکر و کش کردن فایل‌ها
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== cacheName).map(k => caches.delete(k))
      );
    })
  );
});

// واکشی فایل‌ها از کش یا اینترنت
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
