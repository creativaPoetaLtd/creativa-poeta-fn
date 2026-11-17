# Creativa Poeta Art — galerie, catalogue et demandes

## Catalogue et demandes : deuxième étape

Le frontend est sur `feature/cp-art-gallery` et le backend associé sur `feature/cp-art-catalog`. Cette étape reste locale ; aucun push ni déploiement de CP Art n’a été effectué.

Les nouveaux écrans du tableau de bord sont :

- `/secure-admin-dashboard-2024/cp-art` : création, modification, publication et archivage des œuvres.
- `/secure-admin-dashboard-2024/cp-art-requests` : suivi des demandes de sélection (nouvelle, client contacté, clôturée).

Le catalogue enregistre jusqu’à 12 photographies ordonnées avec leurs descriptions FR/EN/NL, les histoires, les détails symboliques et jusqu’à 30 variantes. Chaque variante possède son prix public en centimes d’euro, son support, son format, sa disponibilité, un délai de préparation indicatif et ses pays de livraison. La fabrication personnelle et l’impression partenaire sont distinguées. Les références de prestataire ne sont jamais retournées par le catalogue public.

La galerie réelle et les fiches sont raccordées à l’API. Le visiteur peut préparer une sélection persistante, modifier les quantités et choisir un pays de l’Union européenne. Le serveur vérifie à nouveau les prix et la disponibilité avant de produire le récapitulatif. Une demande avec consentement est enregistrée avec une référence et un instantané des prix, puis apparaît dans le tableau de bord. Une répétition de la même soumission retrouve la même référence ; une demande différente ne peut pas réutiliser silencieusement cette référence.

**Les demandes ne sont pas des achats.** Aucun paiement n’est pris, aucun email automatique n’est envoyé et aucune fabrication n’est lancée. Les frais de livraison restent à confirmer. Le statut de paiement ne peut pas être modifié par le client ou par le formulaire de suivi.

### Configuration du catalogue réel

Le mode par défaut reste l’aperçu avec les quatre études. Pour utiliser les œuvres de la base, configurer le frontend avant démarrage ou compilation :

```text
VITE_ART_CATALOG_MODE=live
VITE_API_BASE_URL=<URL du backend disposant des routes CP Art>
```

Le backend réutilise MongoDB, l’authentification et la configuration Cloudinary existantes. Les nouvelles routes sont regroupées sous `/api/art`. Le stockage des photographies requiert `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` et `CLOUDINARY_API_SECRET`, uniquement côté backend. Les photographies de présentation sont limitées à 3 Mo (JPEG, PNG, WebP) et optimisées par Cloudinary. Les fichiers maîtres d’impression ne sont pas destinés à cette galerie publique.

Les accès `art:catalog` et `art:requests` sont configurables dans la gestion des administrateurs. La direction et le compte racine disposent de leur accès habituel ; les autres comptes doivent recevoir les permissions correspondantes. Aucun contrôle d’authentification ou de MFA existant n’est contourné.

Les brouillons et les archives sont absents de la galerie publique. Les modifications sont protégées contre les sauvegardes concurrentes et auditées selon les conventions du projet. L’archivage conserve les fiches ; aucun bouton de suppression physique n’est ajouté.

### Vérification de cette étape

- Suite backend : **46 tests réussis**.
- Contrôles API sur une base MongoDB temporaire : **21 scénarios réussis**, voir [verification-api.json](verification-api.json).
- Parcours navigateur raccordé à cette base : **19 scénarios réussis**, voir [verification-live.json](verification-live.json).
- Contrôles de l’aperçu initial : **26 scénarios réussis** après raccordement des routes.
- Compilation frontend : réussie, avec les avertissements de taille de bundle existants.

Les tests ont utilisé uniquement des œuvres et comptes fictifs dans une base locale indépendante. Aucune donnée de production n’a été lue ou modifiée pour ces tests. Le téléversement externe vers le véritable compte Cloudinary, Stripe et un imprimeur n’a pas été exécuté. Le formulaire Made for You conserve son parcours de préparation d’email de la première étape.

Captures avec données de test : [administration du catalogue](admin-catalogue.png), [suivi des demandes](admin-demandes.png), [sélection sur ordinateur](selection-live-desktop.png), [sélection sur mobile](selection-live-mobile.png).

Les scripts `creativaPoeta_bn/scripts/art-qa-server.cjs`, `verify-art-api.cjs` et `scripts/verify-art-live.cjs` constituent le banc de vérification local. Le serveur QA crée toujours sa propre base temporaire et n’accepte pas d’URL de base de production. Les dépendances MongoDB de test et Playwright sont fournies hors des dépendances de production. Les identifiants fictifs temporaires sont supprimés à la fermeture du serveur de test.

## Voir l’aperçu

Branche de travail : `feature/cp-art-gallery`.

Depuis le frontend, lancer `npm.cmd run dev -- --host 127.0.0.1 --port 5184 --strictPort`, puis ouvrir :

- Accueil : <http://127.0.0.1:5184/fr/art>
- Collections : <http://127.0.0.1:5184/fr/art/collections>
- Exemple de collection : <http://127.0.0.1:5184/fr/art/collections/art-et-decoration>
- Galerie et recherche : <http://127.0.0.1:5184/fr/art/galerie>
- Fiche œuvre : <http://127.0.0.1:5184/fr/art/oeuvres/le-passage>
- Personnalisation : <http://127.0.0.1:5184/fr/art/personnalisation>

Les routes existent également avec les préfixes anglais et néerlandais. La navigation permet de changer de langue. Le menu principal du site contient une entrée Creativa Poeta Art.

## Périmètre livré

- Identité éditoriale ivoire, brun et terre cuite, responsive.
- Les cinq univers du brief ; Made for You dispose de son propre parcours.
- Quatre études de présentation clairement identifiées, avec leurs textes FR/EN/NL.
- Recherche et filtre par collection, état vide et récupération des routes inconnues.
- Fiche avec vue complète, détail de composition, simulation d’encadrement, agrandissement accessible, intention artistique et détails symboliques.
- Choix exploratoires de support et de format transmis au parcours personnalisé.
- Formulaire de préparation d’email avec validation, récapitulatif et possibilité de modifier le message. Le message n’est pas envoyé par le site ; le visiteur le relit et l’envoie dans son application email.

Cette étape est un aperçu local, non publié. Les pages Art portent une directive `noindex, nofollow` et ne sont pas ajoutées au sitemap de production. Aucune étude n’est vendable et aucun prix, avis client, stock ou délai de livraison n’est inventé. Les variantes de support et de format sont illustratives.

Le catalogue administrable et les demandes sont désormais implémentés comme décrit ci-dessus. Restent l’ajout des œuvres réelles et de leurs prix validés, la livraison chiffrée, les fichiers privés de fabrication, le paiement et le raccordement à l’imprimeur. Les créations commerciales seront ajoutées à partir des œuvres réelles du propriétaire.

## Vérifications

- `npm.cmd run build` : réussi, avec les avertissements de taille de bundle déjà présents dans le projet.
- 26 contrôles navigateur : réussis, dans Microsoft Edge en mode headless, aux formats bureau 1440 × 1100 et mobile 390 × 844.
- Résultat détaillé : [verification.json](verification.json).
- Contrôles incluant recherche, filtre, vues d’œuvre, sélecteurs, dialogue et Échap, validation de formulaire, conservation des options, langues, menu mobile, absence de débordement et de texte tronqué, chargement des images et absence d’erreur JavaScript non interceptée.
- Aucun paiement, commande ou email n’a été déclenché pendant les contrôles.

Le script `scripts/verify-art-preview.cjs` utilise Playwright comme outil de contrôle externe. Il accepte `PLAYWRIGHT_MODULE_PATH` si Playwright est installé hors du dépôt, et `ART_PREVIEW_URL` pour changer l’URL. Aucune dépendance de production ou de test n’a été ajoutée au package du frontend.

Captures : [accueil bureau](home-desktop.png), [collections bureau](collections-desktop.png), [fiche bureau](work-desktop.png), [accueil mobile](home-mobile.png), [fiche mobile](work-mobile.png).

## Visuels d’étude et provenance

Génération avec l’outil intégré Imagegen, à partir des deux prompts ci-dessous. Les fichiers PNG originaux sont conservés dans le dossier d’images générées de Codex. Leurs versions WebP optimisées sont enregistrées dans le projet :

- `public/art/studies/le-passage.webp` : illustration paysagère.
- `public/art/studies/memoire-des-lieux.webp` : illustration architecturale.

Les compositions typographiques de Words of Life, Faith & Hope et Made for You sont construites en HTML/CSS et restent lisibles et adaptables. La phrase Faith & Hope est une phrase de création, pas une citation biblique. Les récits et noms associés aux études sont des exemples éditoriaux de présentation.

### Prompt — Le Passage

> Use case: stylized-concept. Asset type: full-bleed artwork specimen for a private art-gallery website design prototype; not a real product or existing artist's artwork. Create an original sophisticated panoramic fine-art painting titled only in metadata The Passage: a solitary small human figure approaching an ancient stone arch across a quiet river, distant misty hills, warm rust and ochre earth, muted deep petrol water, pale luminous linen sky, balanced asymmetrical composition, atmospheric layered oil paint and subtly visible canvas grain, contemplative and hopeful, rich meaningful small details, warm Mediterranean light. Wide landscape 3:2 format. Show ONLY the flat artwork edge to edge, no frame, no wall, no room, no letters, no signature, no watermark. Original composition, not an imitation of any named artist.

### Prompt — Mémoire des lieux

> Use case: stylized-concept. Asset type: original flat artwork specimen for a private art-gallery website prototype, not a real catalogue product. Create a sophisticated contemporary mixed-media architectural painting exploring memory and belonging: a sunlit passage with terracotta and warm ochre plaster buildings, arched dark blue doorway, subtle woven geometric motifs in the shadows, a small living green plant emerging beside old steps, layered paper and handmade plaster texture, poetic interplay of home, journeys and reconstruction. Muted saffron, clay, dusty rose, indigo and parchment palette. Elegant spare but rich composition, portrait 4:5 format. Flat artwork edge to edge, no frame, no wall staging, no writing, no signature, no watermark; no stereotyped ethnic symbols and no imitation of any named artist.
