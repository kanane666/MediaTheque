# 📚 Médiathèque

Une application web progressive (PWA) pour suivre, noter et partager ta collection de médias — films, séries, mangas, livres, jeux vidéo, podcasts, anime, BD, théâtre et plus.

---

## 🚀 Démo & Déploiement

L'application est déployée sur **Vercel** et utilise **Firebase** pour l'authentification et la synchronisation des données en temps réel.

> **Stack** : HTML/CSS/JS vanilla · Firebase Auth + Firestore · TMDB API · Open Library API · Chart.js · Tabler Icons · PWA (Service Worker)

---

## ✨ Fonctionnalités complètes

### 📖 Bibliothèque

#### Vues
- **Vue grille** (par défaut) — Couvertures style livres en 3D avec effet de tranche, ombre portée, et barre de progression pour les médias en cours
- **Vue liste** — Cards compactes avec emoji de catégorie, titre, auteur, statut cliquable et boutons d'action
- Toggle grille/liste mémorisé en localStorage

#### Gestion des médias
- **Ajouter** un média avec : titre, catégorie, statut, auteur/créateur, année, note (demi-étoiles), commentaire personnel, tags, progression (épisode X/Y), durée
- **Modifier** un média — clic sur le crayon au survol, modal pré-rempli
- **Supprimer** avec modal de confirmation (évite les suppressions accidentelles)
- **Clic sur une couverture** → drawer latéral avec tous les détails

#### Couvertures
- Recherche automatique via **TMDB** pour films et séries (poster HD)
- Recherche automatique via **Open Library** pour livres, mangas, BD
- Upload manuel avec compression automatique (canvas JPEG 65%, max 500px)
- Prévisualisation en temps réel dans le formulaire

#### Durée automatique (TMDB)
- Bouton **⚡ Auto** dans le formulaire — interroge TMDB selon la catégorie sélectionnée
- Films : durée totale en minutes
- Séries/Anime : durée par épisode + nombre total d'épisodes auto-rempli
- Toutes les catégories : durée en **minutes** (y compris jeux vidéo)

#### Filtres & Tri
- Recherche par titre ou auteur (temps réel)
- Filtre par statut (Terminé / En cours / À voir / Abandonné)
- Tri : Plus récents, Plus anciens, Mieux notés, Titre A→Z, Titre Z→A
- Filtre par **tags** — barre cliquable sous la liste
- Compteur de résultats

#### Statut rapide
- Clic sur le badge de statut (liste) ou le point coloré (grille) → menu contextuel avec les 4 statuts
- Mise à jour Firebase instantanée

#### Notation demi-étoiles
- Système SVG interactif : moitié gauche = demi-étoile, moitié droite = étoile entière
- Valeurs possibles : 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5
- Affichage partout : grille, liste, drawer, palmarès
- Label descriptif sous le sélecteur

#### Tags libres
- Saisie avec Entrée ou virgule pour valider
- Chips supprimables dans le formulaire
- Barre de filtrage globale par tag
- Affichés en vue liste (cachés sur mobile pour l'espace)

#### Progression
- Champs Actuel / Total (ex: épisode 12/25 ou tome 3/10)
- Barre de progression en bas de la couverture (vue grille, statut "En cours" uniquement)
- Détail affiché dans le drawer

---

### 🗂 Catégories

#### Catégories par défaut
Séries · Films · Théâtre · Manga · Anime · Livres · BD · Jeux vidéo · Podcasts · Docs · Autre

#### Gestion complète
- **Renommer** n'importe quelle catégorie
- **Changer l'icône** — sélecteur d'emojis (50+ choix)
- **Masquer/Démasquer** — la catégorie et tous ses médias disparaissent de la vue et des stats
- **Ajouter** des catégories personnalisées (nom + icône)
- **Supprimer** une catégorie personnalisée (uniquement si vide)
- Catégories par défaut : masquables mais non supprimables

#### Mode aperçu des masqués
- Bouton **👁 Masqués (X)** dans la barre — visible uniquement si des catégories masquées contiennent des médias
- Active un mode où les médias masqués s'affichent atténués avec badge 🙈
- Les catégories masquées réapparaissent dans la sidebar en mode aperçu
- Les stats **excluent toujours** les catégories masquées (même en mode aperçu)

---

### 📊 Stats

#### Carte récap
- Total de médias, terminés, en cours, à voir, note moyenne
- Carte **⏱ Temps consommé** cliquable → modal détaillé avec breakdown par catégorie et estimation du temps restant (wishlist)
- Chiffre fun : *"3.2 jours de contenu consommé 🎉"*

#### Graphiques (Chart.js)
- **Donut** : répartition par catégorie
- **Bar** : distribution des notes (0.5 à 5 par demi-incréments)
- **Bar** : médias ajoutés par mois (12 derniers mois)

#### Palmarès
- Top 5 des médias les mieux notés avec médailles 🥇🥈🥉

#### Mode découverte — Surprise moi !
- Pioche aléatoirement dans la **wishlist**
- Filtres : Tout / Court (&lt;2h) / Long (+2h) / Non noté
- Affiche la couverture, titre, durée, note
- Bouton **"Je regarde ça ce soir !"** → passe le média en "En cours" directement
- Bouton **"Autre chose"** → nouvelle suggestion

#### Rapport annuel exportable (Wrapped)
- Bouton disponible dès 5 médias dans la collection
- Génère un **PNG 540×960** (format story) avec fond étoilé
- Contenu : année, total ajoutés, terminés, temps consommé, note moyenne, catégorie favorite, humeur dominante du journal
- Téléchargement direct — #MaMediatheque

---

### 📓 Journal de bord

- Sélecteur de média (liste déroulante de toute la collection)
- Zone de texte libre pour notes d'impression
- **6 emojis d'humeur** : 🤩 😍 😊 😐 😤 😢
- Entrées en ordre chronologique inverse avec date et humeur
- Suppression par entrée individuelle
- Stocké en **localStorage** (local, rapide, hors ligne)

---

### 👥 Amis & Partage

#### Lien de partage public
- URL unique générée automatiquement avec ton UID Firebase
- Copie en 1 clic

#### Invitations
- Invitation par email — statut "En attente" jusqu'à confirmation
- Liste des amis avec indicateur de statut

#### Recommandations
- Envoyer un média à un ami avec message personnalisé
- Les recommandations reçues s'affichent avec bouton **"Ajouter à ma wishlist"**
- Dismissable

#### Comparaison de compatibilité
- Bouton **Comparer** sur chaque ami connecté
- Score de compatibilité en % basé sur les notes communes
- Médias en commun avec vos notes respectives côte à côte
- Suggestions : médias que l'ami a notés 4-5★ que tu n'as pas encore

---

### 🔔 Notifications en-app

- Cloche 🔔 dans la topbar avec badge rouge si notifications non lues
- **Alerte "En cours depuis longtemps"** : média en cours depuis +30 jours — propose Terminé ou Abandonné
- **Alerte "Wishlist surchargée"** : +20 médias en wishlist → lien vers Surprise moi
- Panel dismissable, max 15 notifications
- Stocké en localStorage

---

### 📴 Mode hors ligne

- **Indicateur visuel** dans la topbar : badge rouge 🔴 "Hors ligne" quand déconnecté
- **Badge orange** avec compteur d'actions en attente (cliquable pour synchroniser manuellement)
- À la reconnexion : **flush automatique** de la queue vers Firestore
- La bibliothèque reste **visible et consultable** hors ligne (cache Firestore natif)
- Les actions de statut rapide sont mises en queue si hors ligne

---

### 📱 PWA (Progressive Web App)

#### Installation
- **Bottom sheet animée** au 1er chargement (5 secondes après l'ouverture, max 3 fois)
- Sur **Android/Desktop** : bouton Installer direct via `beforeinstallprompt`
- Sur **iOS Safari** : instructions illustrées Partager → Sur l'écran d'accueil
- Service Worker pour le cache des assets statiques

#### Mobile
- Barre de navigation en bas (Biblio / Stats / Journal / Amis)
- Interface entièrement responsive
- Vue liste optimisée : seuls le titre, sous-titre et boutons action (modifier/supprimer) sont visibles pour maximiser l'espace
- Vue grille adaptée en colonnes multiples selon la taille d'écran

---

### 🧭 Onboarding

- Déclenché automatiquement à la première visite si la collection est vide
- 3 étapes avec dots de progression
- Présente les fonctionnalités clés : collection, ajout de médias, 4 onglets
- Bouton "Ignorer" disponible à chaque étape
- Mémorisé en localStorage (`mth_onboarded`)

---

## ⚙️ Configuration

### Firebase

1. Crée un projet sur [console.firebase.google.com](https://console.firebase.google.com)
2. Active **Authentication** → Google Sign-in
3. Active **Firestore Database** (mode production)
4. Dans **Authentication → Paramètres → Domaines autorisés**, ajoute ton domaine Vercel
5. Remplace la config dans `index.html` :

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

### TMDB API

1. Crée un compte sur [themoviedb.org](https://www.themoviedb.org/signup)
2. Va dans **Paramètres → API → Créer une application développeur**
3. Copie la **clé API v3** (courte)
4. Remplace dans `index.html` :

```javascript
const TMDB_KEY = 'ta_clé_ici';
```

### ImgBB (optionnel — upload images)

Sans clé : les images uploadées manuellement sont compressées et stockées en base64 dans Firestore (max ~150Ko après compression).

Avec clé : les images sont hébergées sur ImgBB (CDN gratuit) et seule l'URL est stockée dans Firestore (recommandé pour les grandes collections).

1. Crée un compte sur [imgbb.com](https://imgbb.com)
2. Récupère ta clé API gratuite
3. Remplace dans `index.html` :

```javascript
const IMGBB_KEY = 'ta_clé_imgbb';
```

---

## 📁 Structure des fichiers

```
MediaTheque/
├── index.html        # Application complète (HTML + CSS + JS)
├── sw.js             # Service Worker (cache PWA)
├── manifest.json     # Manifest PWA (icône, nom, couleurs)
├── vercel.json       # Configuration Vercel (rewrites)
├── icone-192.png     # Icône PWA 192×192
├── icone-512.png     # Icône PWA 512×512
└── README.md         # Ce fichier
```

---

## 🗄 Structure Firestore

```
users/
  {uid}/
    items/
      {itemId}/
        title: string
        cat: string           // 'film' | 'serie' | 'manga' | 'livre' | ...
        status: string        // 'done' | 'progress' | 'wishlist' | 'abandoned'
        author: string
        year: string
        rating: number        // 0 à 5 par pas de 0.5
        note: string
        coverUrl: string      // URL distante ou base64 compressé
        tags: string[]
        progCur: number       // progression actuelle
        progTot: number       // progression totale
        duration: number      // durée en minutes
        added: Timestamp
```

---

## 💾 Données locales (localStorage)

| Clé | Contenu |
|-----|---------|
| `mth_cats` | Catégories personnalisées + état masqué |
| `mth_view` | Vue préférée (grid/list) |
| `mth_journal` | Entrées du journal de bord |
| `mth_notifs` | Notifications lues/non lues |
| `mth_offline_queue` | Actions en attente de sync |
| `mth_friends` | Liste d'amis + invitations |
| `mth_recos` | Recommandations reçues |
| `mth_onboarded` | Flag onboarding terminé |
| `mth_pwa_shown` | Compteur d'affichage sheet PWA |
| `mth_friend_items_{email}` | Cache items pour comparaison |

---

## 🚀 Déploiement sur Vercel

1. Fork ou push le projet sur GitHub
2. Connecte le repo sur [vercel.com](https://vercel.com)
3. Vercel détecte automatiquement le projet statique
4. Le fichier `vercel.json` gère les rewrites nécessaires
5. Ajoute l'URL de déploiement dans Firebase Auth → Domaines autorisés

---

## 🔧 Développement local

```bash
# Cloner le repo
git clone https://github.com/ton-user/mediatheque.git
cd mediatheque

# Serveur local (Python)
python3 -m http.server 8080

# Ou avec Node
npx serve .
```

Ouvre `http://localhost:8080` — le Service Worker et les APIs Firebase fonctionnent en local.

---

## 🛣 Roadmap

- [ ] Intégration complète Firebase Storage pour les images uploadées
- [ ] Synchronisation Firestore du journal et des amis (actuellement localStorage)
- [ ] Notifications push via Firebase Cloud Messaging
- [ ] Partage de bibliothèque publique en lecture seule
- [ ] Widget iOS/Android (Shortcut)
- [ ] Import depuis Letterboxd, MyAnimeList, Goodreads
- [ ] Thème clair

---

## 📄 Licence

Projet personnel — usage libre.
