# Vidéo Background Hero

## Fichier requis :

- `hero-coding.mp4` - Vidéo de background pour la section Hero

## Spécifications :

- **Format :** MP4 (H.264)
- **Durée :** 10-30 secondes (en boucle)
- **Résolution :** 1920x1080 minimum (Full HD)
- **Framerate :** 30fps
- **Taille :** < 5MB pour des performances optimales
- **Audio :** Aucun (muted)

## Contenu suggéré :

Vidéo de codage en accéléré (time-lapse) montrant :
- Code qui s'écrit automatiquement
- Terminal avec commandes
- Interface de développement
- Éléments web qui s'assemblent

## Sources recommandées :

- [Pexels Videos](https://www.pexels.com/videos/) - Vidéos gratuites
- [Pixabay Videos](https://pixabay.com/videos/) - Vidéos libres de droits
- [Unsplash Videos](https://unsplash.com/videos) - Vidéos haute qualité

## Mots-clés de recherche :

- "coding time lapse"
- "programming screen recording"
- "web development"
- "software development"
- "code typing fast"

## Optimisation :

Pour optimiser la taille du fichier :
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1000k -b:a 128k output.mp4
```

## Fallback :

Si aucune vidéo n'est disponible, un gradient animé CSS sera affiché automatiquement. 