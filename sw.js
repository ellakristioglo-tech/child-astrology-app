const BUILD_VERSION = '__APP_BUILD_VERSION__';
const CACHE_PREFIX = 'child-astrology-';
const CACHE_NAME = CACHE_PREFIX + BUILD_VERSION;
const OFFLINE_SHELL = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', function onInstall(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function cacheShell(cache) {
                return cache.addAll(OFFLINE_SHELL);
            })
            .catch(function ignorePrecacheError() {})
            .then(function activateNow() {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function onActivate(event) {
    event.waitUntil(
        caches.keys()
            .then(function removeOldCaches(keys) {
                return Promise.all(
                    keys
                        .filter(function isOldAppCache(key) {
                            return key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME;
                        })
                        .map(function removeCache(key) {
                            return caches.delete(key);
                        })
                );
            })
            .then(function controlOpenWindows() {
                return self.clients.claim();
            })
    );
});

self.addEventListener('message', function onMessage(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function onFetch(event) {
    const request = event.request;
    if (request.method !== 'GET') return;

    event.respondWith((async function networkFirst() {
        try {
            const response = await fetch(request, { cache: 'no-store' });
            if (response.ok && new URL(request.url).origin === self.location.origin) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            const cached = await caches.match(request);
            if (cached) return cached;
            if (request.mode === 'navigate') {
                const fallback = await caches.match('./index.html');
                if (fallback) return fallback;
            }
            throw error;
        }
    })());
});
