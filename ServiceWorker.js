const cacheName = "NewMediaCenter-合成新媒体-1.0";
const contentToCache = [
    "Build/build.loader.js",
    "Build/905bfe969b5886fc85e4cfb638ae90b4.js",
    "Build/a27d0316c740af53e4ff1da53a023809.data",
    "Build/ad9fa96b1f30fbe9d665fa47c0a69395.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
