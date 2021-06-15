const cacheName = "v2";

const cacheAssets = [`index.html`, `main.js`];
// install event
self.addEventListener("install", (e) => {
  console.log("Service worked : Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker : Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("Service worked : Activated");
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service worked : Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Call fetch ecent
/**
 * 1. We check if the live site is available using fetch(e.request)
 * 2. If its not available in the catch , we load the cached website
 * 3.
 */
self.addEventListener("fetch", (e) => {
  console.log("Service Worker : Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
