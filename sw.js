// sw.js — Service Worker Ma Médiathèque
const APP_VERSION = 'v6';
const CACHE_NAME  = `mediatheque-${APP_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icone-192.png',
  '/icone-512.png',
  // Librairies CDN nécessaires au bon fonctionnement hors ligne de l'app
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js',
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

// Ce sont les SEULS hôtes qu'on doit toujours interroger en direct (données
// vivantes / auth) : Firestore, Auth, connexion Google, et les API externes
// de recherche de couverture. Tout le reste (y compris le SDK Firebase lui-même,
// hébergé sur gstatic, Chart.js sur cdnjs, la police d'icônes sur jsdelivr,
// les polices Google) DOIT être mis en cache pour que l'app fonctionne hors ligne.
const LIVE_HOSTS = [
  'firestore.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'firebaseinstallations.googleapis.com',
  'accounts.google.com',
  'apis.google.com',
  'oauth2.googleapis.com',
  'api.themoviedb.org',
  'themoviedb.org',
  'openlibrary.org',
  'api.imgbb.com',
  'imgbb.com',
];

function isLiveHost(hostname) {
  return LIVE_HOSTS.some(h => hostname === h || hostname.endsWith('.' + h));
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  const bypass = isLiveHost(url.hostname) || event.request.method !== 'GET';
  if (bypass) return;

  // Stratégie Cache-First pour tous les assets (app + librairies CDN)
  // → sert depuis le cache si disponible (instantané, fonctionne hors ligne)
  // → sinon réseau + mise en cache
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Mise à jour en arrière-plan sans bloquer
        fetch(event.request).then(response => {
          if (response && (response.ok || response.type === 'opaque')) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response));
          }
        }).catch(() => {});
        return cached;
      }

      return fetch(event.request)
        .then(response => {
          if (response && (response.ok || response.type === 'opaque')) {
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
