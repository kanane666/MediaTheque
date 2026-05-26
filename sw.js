// sw.js — Service Worker Ma Médiathèque
const CACHE_NAME = 'mediatheque-v1';

// Ressources à mettre en cache pour le fonctionnement offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Installation : mise en cache des assets statiques ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── Activation : suppression des anciens caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch : stratégie Network-first pour Firebase, Cache-first pour assets ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Toujours réseau pour Firebase (auth, Firestore, fonts)
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('google') ||
    url.hostname.includes('jsdelivr') ||
    event.request.method !== 'GET'
  ) {
    return; // laisse le navigateur gérer
  }

  // Cache-first pour les assets de l'app
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Mettre en cache les nouvelles ressources valides
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback : retourner index.html pour les navigations
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
