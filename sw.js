// sw.js — Service Worker Ma Médiathèque
const APP_VERSION = 'v5';
const CACHE_NAME  = `mediatheque-${APP_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icone-192.png',
  '/icone-512.png',
];

// ── Installation : pre-cache les assets statiques ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // addAll en ignorant les erreurs individuelles
        return Promise.allSettled(
          STATIC_ASSETS.map(url => cache.add(url).catch(e => console.warn('Cache miss:', url, e)))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activation : supprime les anciens caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Bypass : Firebase, Google APIs, CDNs externes, non-GET
  const bypass =
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('google') ||
    url.hostname.includes('themoviedb') ||
    url.hostname.includes('openlibrary') ||
    url.hostname.includes('imgbb') ||
    url.hostname.includes('cdnjs') ||
    url.hostname.includes('tabler') ||
    url.hostname.includes('fonts.') ||
    event.request.method !== 'GET';

  if (bypass) return;

  // Stratégie Cache-First pour les assets statiques
  // → sert depuis le cache si disponible (instantané)
  // → sinon réseau + mise en cache
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Mise à jour en arrière-plan sans bloquer
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response));
          }
        }).catch(() => {});
        return cached;
      }

      return fetch(event.request)
        .then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// ── Messages depuis l'app ──
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
