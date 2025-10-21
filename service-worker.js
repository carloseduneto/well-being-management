self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/style.css","/file", "/file/script.js"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/index.html"); // fallback offline
        
      });
    })
  );
});

