// sw.js — Service Worker Ma Médiathèque
// ⚠️  Incrémente APP_VERSION à chaque déploiement pour invalider le cache proprement
const APP_VERSION  = 'v2';
const CACHE_NAME   = `mediatheque-${APP_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Installation ──
// On pré-cache les assets ET on active immédiatement (skipWaiting)
// sans attendre que tous les onglets soient fermés.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())   // activation immédiate sans attendre
  );
});

// ── Activation ──
// Supprime TOUS les anciens caches, prend le contrôle de tous les clients,
// puis notifie chaque page ouverte qu'une mise à jour est disponible.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())       // prend le contrôle immédiat
      .then(() => self.clients.matchAll())    // récupère tous les onglets ouverts
      .then(clients => {
        // Notifie chaque onglet → l'app affichera la bannière "Mise à jour disponible"
        clients.forEach(client =>
          client.postMessage({ type: 'SW_UPDATED', version: APP_VERSION })
        );
      })
  );
});

// ── Fetch : Network-first pour l'app, bypass pour Firebase/CDN ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Toujours réseau pour les services externes
  const bypass =
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('google') ||
    url.hostname.includes('jsdelivr') ||
    url.hostname.includes('fonts.') ||
    event.request.method !== 'GET';

  if (bypass) return;

  // Stratégie Network-first pour les fichiers de l'app :
  // → essaie le réseau en priorité (garantit le contenu frais)
  // → si offline ou erreur, sert depuis le cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Mise à jour du cache avec la version fraîche
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        // Offline : sert depuis le cache
        caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback ultime : index.html pour les navigations
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
      )
  );
});

// ── Message depuis l'app → force le rechargement ──
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
