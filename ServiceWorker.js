const cacheName = "NewMediaCenter-合成新媒体-1.0";
const contentToCache = [
    "Build/build.loader.js",
    "Build/3c70ae2897b41ace54720c8be43ae4a9.js",
    "Build/7f51b1f251e4524da2d7ccfd885f3df3.data",
    "Build/cae3789ef1b42ff1632016f957f470a7.wasm",
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
