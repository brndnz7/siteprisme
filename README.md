# SitePrisme - Showcase Website

Une single-page application ambitieuse et responsive présentant SitePrisme, agence de création de sites web spécialisée dans les secteurs Fast-Food, E-commerce, Restaurant Gastronomique et Café.

## 🚀 Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** + **GSAP ScrollTrigger**
- **EmailJS** pour l'envoi des formulaires
- **Lucide React** pour les icônes

## 🛠️ Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd siteprisme-showcase
```

2. Installer les dépendances
```bash
pnpm install
# ou
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
```
Remplir les clés EmailJS dans le fichier `.env`

4. Lancer le serveur de développement
```bash
pnpm dev
# ou
npm run dev
```

## 📧 Configuration EmailJS

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un service email
3. Créer un template d'email
4. Récupérer les clés et les ajouter dans `.env`

## 🚀 Déploiement

### Netlify / Vercel
```bash
npm run build
```
Puis déployer le dossier `dist/`

### GitHub Pages
```bash
npm run deploy
```

## 🎨 Fonctionnalités

- ✅ Hero section avec vidéo background et animations reveal
- ✅ Portfolio interactif avec filtres et lightbox 3D
- ✅ Animations scroll-parallax GSAP
- ✅ Formulaire de contact avec validation
- ✅ Dark/Light mode toggle
- ✅ SEO optimisé avec Schema.org
- ✅ Performance LCP < 1.8s
- ✅ Accessibilité WCAG AA
- ✅ Responsive design

## 📱 Sections

1. **Header sticky** - Navigation translucide
2. **Hero** - Punchline avec vidéo background
3. **Nos expertises** - 4 segments avec icônes animés
4. **Portfolio interactif** - Grille filtrable
5. **Processus** - Timeline horizontale 3 étapes
6. **Témoignages** - Slider automatique
7. **Formulaire contact** - Brief de projet
8. **Footer** - Liens et mentions légales

## 🎨 Design System

### Palette de couleurs
- Nuit: `#10141B`
- Blanc cassé: `#F5F6F7`
- Bleu électrique: `#1E90FF`
- Saumon: `#FF9671`

### Typographies
- Titres: **Space Grotesk** 700
- Texte: **Inter** 400-500

### Animations
- Révélation clip-path
- Hover scale 1.05
- Scroll parallax
- Compteurs animés
- Labels flottants

## 📄 Licence

Projet propriétaire SitePrisme © 2024 