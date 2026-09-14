// 🏟️ نام نسخه کش استادیوم تیله‌بازی (با تغییر این عدد، کل سیستم کاربران بروزرسانی می‌شود)
const cacheName = "tille-stadium-v2";

// 📦 لیست جامع تمام فایل‌های حیاتی بازی جهت لود ۱۰۰٪ آفلاین و بدون اینترنت
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./1.png",
  "./6.png",          // تیله دست اصلی بازیکن (اضافه شد)
  "./menu_bg.jpg",    // پس‌زمینه نئون جدید منوها (اضافه شد)
  "./grass.jpg",
  "./carpet.jpg",     // پس‌زمینه کف‌پوش فرش (اضافه شد)
  "./asphalt.jpg",    // پس‌زمینه کف‌پوش آسفالت (اضافه شد)
  "./cement.jpg",     // پس‌زمینه کف‌پوش سیمان (اضافه شد)
  "./dirt.jpg"        // پس‌زمینه کف‌پوش خاک (اضافه شد)
];

// ⏳ نصب سرویس‌ورکر و ذخیره امن تمام دارایی‌ها در حافظه گوشی
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("🏟️ استادیوم با موفقیت آفلاین ذخیره شد.");
      return cache.addAll(assets);
    }).then(() => self.skipWaiting()) // فعال‌سازی فوری بدون معطلی بازیکن
  );
});

// 🚀 فعال‌سازی و پاکسازی خودکار و آنی کش‌های منقضی شده قدیمی
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== cacheName).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim()) // کنترل فوری تمام صفحات باز بازی
  );
});

// 🌐 سیستم واکشی هوشمند (اول بررسی اینترنت برای کدهای جدید، اگر نبود اجرای آفلاین از کش)
self.addEventListener("fetch", (e) => {
  // عدم دخالت در درخواست‌های متفرقه یا افزونه‌ها
  if (!e.request.url.startsWith(self.location.origin)) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // اگر اینترنت وصل بود، نسخه جدید را می‌گیرد و در کش آپدیت می‌کند
        if (response.status === 200) {
          const resClone = response.clone();
          caches.open(cacheName).then((cache) => cache.put(e.request, resClone));
        }
        return response;
      })
      .catch(() => {
        // اگر اینترنت کاملاً قطع بود، فایل را با سرعت برق‌آسا از کش گوشی لود می‌کند
        return caches.match(e.request).then((cachedResponse) => {
          return cachedResponse || caches.match("./index.html");
        });
      })
  );
});
