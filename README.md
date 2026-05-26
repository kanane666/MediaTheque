# 📚 Ma Médiathèque

Application personnelle pour classifier et retrouver tous tes médias : séries, films, théâtre, manga, anime, livres, BD, jeux vidéo, podcasts, documentaires.

## Fonctionnalités

- **12 catégories** avec filtrage par sidebar
- **4 statuts** : Terminé, En cours, À voir, Abandonné
- **Notes 1–5 étoiles** + commentaire personnel
- **Recherche** par titre ou auteur
- **Stats** en temps réel (total, terminés, en cours, à voir, note moyenne)
- **Export JSON** pour sauvegarder ta liste
- **Import JSON** pour la restaurer ou la transférer
- **100% localStorage** — aucun serveur, aucune donnée envoyée
- Raccourcis clavier : `Entrée` pour valider, `Échap` pour fermer

---

## Déploiement sur Vercel

### Méthode 1 — Via l'interface Vercel (recommandée)

1. Va sur [vercel.com](https://vercel.com) et connecte-toi (ou crée un compte gratuit)
2. Clique sur **"Add New Project"**
3. Clique sur **"Import Git Repository"** → ou utilise **"Deploy from template / upload"**
4. Si tu n'as pas de repo GitHub : crée un repo GitHub, ajoute ces fichiers dedans, puis importe-le sur Vercel
5. Vercel détecte automatiquement que c'est un site statique
6. Clique **Deploy** — ton app est en ligne en 30 secondes ✅

### Méthode 2 — Via GitHub (la plus simple sur le long terme)

```bash
# 1. Crée un repo sur github.com, puis :
git init
git add .
git commit -m "Initial commit — Ma Médiathèque"
git remote add origin https://github.com/TON_USERNAME/mediatheque.git
git push -u origin main
```

Ensuite sur Vercel :
- "Add New Project" → importe le repo GitHub
- Chaque `git push` redéploie automatiquement

### Méthode 3 — Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Structure du projet

```
mediatheque/
├── index.html     # L'app complète (HTML + CSS + JS en un seul fichier)
├── vercel.json    # Config Vercel (routes, headers de sécurité, cache)
└── README.md      # Ce fichier
```

---

## Données et vie privée

Toutes tes données sont stockées **uniquement dans ton navigateur** via `localStorage`.  
Aucune donnée n'est envoyée à un serveur.

Pour transférer ta liste vers un autre appareil ou navigateur :
1. Clique **"Exporter JSON"** dans la sidebar
2. Sauvegarde le fichier `.json`
3. Sur le nouvel appareil, clique **"Importer JSON"** et sélectionne le fichier

---

## Développement local

Ouvre simplement `index.html` dans ton navigateur — aucun serveur local requis.

```bash
# Optionnel : si tu veux un serveur local
npx serve .
# ou
python3 -m http.server 3000
```
