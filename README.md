# 📚 Ma Médiathèque

Application personnelle pour classifier et retrouver tous tes médias.  
**Données synchronisées sur tous tes appareils via Firebase (gratuit).**

---

## ⚙️ Étape 1 — Créer ton projet Firebase (5 minutes, gratuit)

### 1.1 — Créer le projet
1. Va sur **[console.firebase.google.com](https://console.firebase.google.com)**
2. Clique **"Ajouter un projet"**
3. Nom du projet : `mediatheque` (ou ce que tu veux)
4. Désactive Google Analytics (pas nécessaire) → **Créer le projet**

### 1.2 — Activer l'authentification Google
1. Dans le menu gauche → **Authentication** → **Commencer**
2. Onglet **"Sign-in method"** → clique **Google**
3. Active le bouton → renseigne ton email de support → **Enregistrer**

### 1.3 — Créer la base de données Firestore
1. Dans le menu gauche → **Firestore Database** → **Créer une base de données**
2. Choisis **"Commencer en mode production"** → **Suivant**
3. Région : choisis `europe-west1` (Belgique) pour la rapidité → **Activer**
4. Une fois créée, va dans l'onglet **"Règles"** et remplace tout par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Clique **Publier** — Chaque utilisateur ne peut accéder qu'à ses propres données.

### 1.4 — Récupérer la config Firebase
1. Dans le menu gauche → icône ⚙️ **Paramètres du projet**
2. Section **"Vos applications"** → clique **</>** (Web)
3. Nom de l'app : `mediatheque-web` → **Enregistrer l'application**
4. Firebase affiche un objet `firebaseConfig` qui ressemble à ça :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mediatheque-xxxxx.firebaseapp.com",
  projectId: "mediatheque-xxxxx",
  storageBucket: "mediatheque-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 🔧 Étape 2 — Coller ta config dans index.html

Ouvre `index.html` et cherche ce bloc (vers la ligne 300) :

```javascript
const firebaseConfig = {
  apiKey:            "REMPLACE_PAR_TON_API_KEY",
  authDomain:        "REMPLACE_PAR_TON_AUTH_DOMAIN",
  projectId:         "REMPLACE_PAR_TON_PROJECT_ID",
  storageBucket:     "REMPLACE_PAR_TON_STORAGE_BUCKET",
  messagingSenderId: "REMPLACE_PAR_TON_SENDER_ID",
  appId:             "REMPLACE_PAR_TON_APP_ID"
};
```

Remplace chaque valeur par celles de ta console Firebase. Sauvegarde.

---

## 🚀 Étape 3 — Déployer sur Vercel

### Via GitHub (recommandé)

```bash
git init
git add .
git commit -m "Ma médiathèque avec Firebase"
git remote add origin https://github.com/TON_USERNAME/mediatheque.git
git push -u origin main
```

Ensuite sur **[vercel.com](https://vercel.com)** :
- **"Add New Project"** → importe le repo GitHub → **Deploy**
- Chaque `git push` redéploie automatiquement ✅

### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔐 Étape 4 — Autoriser ton domaine Vercel dans Firebase

Une fois déployé sur Vercel, tu dois autoriser le domaine :

1. Console Firebase → **Authentication** → **Sign-in method**
2. Bas de page → **"Domaines autorisés"**
3. Clique **"Ajouter un domaine"**
4. Colle ton URL Vercel : `ton-projet.vercel.app`
5. **Ajouter** ✅

Sans ça, la connexion Google sera bloquée en production.

---

## 📱 Utilisation

- **Connexion** : clique "Continuer avec Google" — tes données se chargent automatiquement
- **Ajout** : bouton "+ Ajouter" → remplis le formulaire → Enregistrer (ou `Entrée`)
- **Filtres** : catégorie dans la sidebar, statut et recherche en haut de liste
- **Suppression** : icône 🗑️ sur chaque carte
- **Export** : sauvegarde JSON de secours dans la sidebar
- **Import** : restaure un export JSON dans la sidebar
- **Déconnexion** : icône → dans la sidebar à côté de ton nom

---

## 🏗️ Structure

```
mediatheque/
├── index.html     ← App complète (HTML + CSS + JS + Firebase)
├── vercel.json    ← Config Vercel
└── README.md      ← Ce guide
```

## 💾 Modèle de données Firestore

```
users/
  {userId}/
    items/
      {itemId}/
        title    : string
        cat      : string  (serie, film, manga, anime, livre, bd, jeu, podcast, docu, theatre, autre)
        status   : string  (done, progress, wishlist, abandoned)
        author   : string
        year     : string
        rating   : number  (0-5)
        note     : string
        added    : timestamp
```

## 💰 Coût Firebase (plan gratuit Spark)

| Ressource         | Limite gratuite | Usage attendu       |
|-------------------|----------------|---------------------|
| Lectures/jour     | 50 000         | ~100 pour toi       |
| Écritures/jour    | 20 000         | ~10 par jour        |
| Suppression/jour  | 20 000         | Rare                |
| Stockage          | 1 GB           | Quelques Ko maxi    |

**→ Tu ne dépasseras jamais les limites gratuites pour un usage personnel.**
