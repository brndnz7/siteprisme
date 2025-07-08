# Guide de Déploiement - SitePrisme Showcase

## 🚀 Déploiement rapide

### Netlify (Recommandé)

1. **Via interface web :**
   - Connectez votre repository GitHub
   - Build command : `npm run build`
   - Publish directory : `dist`
   - Le fichier `_redirects` est déjà configuré pour le SPA routing

2. **Via Netlify CLI :**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Vercel

1. **Via interface web :**
   - Importez depuis GitHub
   - Framework preset : Vite
   - Les paramètres sont détectés automatiquement

2. **Via Vercel CLI :**
   ```bash
   npm install -g vercel
   npm run build
   vercel --prod
   ```

### GitHub Pages

```bash
npm run deploy
```

Cette commande build et déploie automatiquement sur GitHub Pages.

## ⚙️ Configuration des variables d'environnement

### Production (Netlify/Vercel)

Ajoutez ces variables dans votre interface d'administration :

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SITE_URL=https://votre-domaine.com
```

### Configuration EmailJS

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email avec ces variables :
   - `{{from_name}}` - Nom du contact
   - `{{from_email}}` - Email du contact
   - `{{company}}` - Entreprise
   - `{{sector}}` - Secteur d'activité
   - `{{budget}}` - Budget estimé
   - `{{message}}` - Message du projet
   - `{{to_name}}` - Destinataire (SitePrisme)

4. Récupérez vos clés API et configurez les variables d'environnement

## 🎨 Assets requis

### Images des projets

Placez dans `public/assets/mockups/` :
- burger-palace.webp
- pizza-express.webp
- techstore-pro.webp
- fashion-boutique.webp
- petit-gourmet.webp
- brasserie-port.webp
- coffee-corner.webp
- cafe-boheme.webp

### Vidéo Hero

Placez dans `public/video/` :
- hero-coding.mp4 (vidéo de codage en time-lapse)

## 🔧 Optimisations post-déploiement

### Performance

1. **Vérifiez les Core Web Vitals :**
   - LCP < 1.8s ✅
   - FID < 100ms ✅
   - CLS < 0.1 ✅

2. **Outils de mesure :**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [GTmetrix](https://gtmetrix.com/)
   - [WebPageTest](https://www.webpagetest.org/)

### SEO

1. **Mettez à jour les meta-tags :**
   - URL de production dans `index.html`
   - Image OG `og-image.jpg` dans `public/`

2. **Soumettez à Google :**
   - [Google Search Console](https://search.google.com/search-console)
   - Générez un sitemap.xml

### Analytics

Ajoutez Google Analytics ou Plausible Analytics :

```html
<!-- Dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Checklist avant déploiement

- [ ] Variables d'environnement configurées
- [ ] Images des projets ajoutées
- [ ] Vidéo hero ajoutée (optionnel)
- [ ] Meta-tags mis à jour avec la vraie URL
- [ ] EmailJS configuré et testé
- [ ] Build sans erreurs : `npm run build`
- [ ] Tests locaux : `npm run preview`
- [ ] Lighthouse score > 90

## 🔄 Déploiement continu

### GitHub Actions (optionnel)

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

Pour toute question sur le déploiement :
- Documentation Netlify : https://docs.netlify.com/
- Documentation Vercel : https://vercel.com/docs
- EmailJS Documentation : https://www.emailjs.com/docs/ 