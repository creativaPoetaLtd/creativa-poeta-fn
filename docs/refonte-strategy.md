# Refonte Creativa Poeta - Strategie Produit, SEO, AEO et GEO

## Objectif

La refonte de Creativa Poeta ne doit pas seulement moderniser le site. Elle doit repositionner Creativa Poeta comme une agence de visibilite digitale nouvelle generation, capable de rendre une entreprise visible sur Google, les moteurs de reponse, les assistants IA, les cartes et les recherches vocales.

Le site refondu doit devenir la premiere preuve du service vendu: un site rapide, multilingue, multi-marche, lisible par les humains, les moteurs de recherche et les systemes IA.

## Decisions validees

- On commence avec des sous-domaines par marche.
- On garde un seul frontend, un seul backend et une seule base.
- Tous les sous-domaines pointent vers la meme application.
- L'application choisit le marche et la langue selon le hostname, avec possibilite de changer manuellement.
- Le frontend actuel Vite/React sera refondu vers une architecture plus adaptee au SEO/AEO/GEO, avec preference pour Next.js App Router.
- Le front reste sur Netlify tant que cela ne bloque pas. Une migration vers Vercel pourra etre decidee si Next.js, les domaines ou les previews deviennent plus simples a gerer la-bas.
- Le backend reste sur Vercel.
- La nouvelle DB MongoDB Atlas et le nouveau Cloudinary sont les sources sous controle Creativa Poeta.

## Marches et langues

| Marche | Domaine principal de depart | Langues | Langue par defaut | Notes |
| --- | --- | --- | --- | --- |
| Global | creativapoeta.com | en, fr | en | Site international et fallback |
| Belgique | be.creativapoeta.com | fr, nl | fr | Possiblement creativapoeta.be plus tard |
| France | fr.creativapoeta.com | fr | fr | Possiblement creativapoeta.fr plus tard |
| Rwanda | rw.creativapoeta.com | rw, fr, en | rw | Possiblement creativapoeta.rw plus tard |
| Pays-Bas | nl.creativapoeta.com | nl | nl | Possiblement creativapoeta.nl plus tard |

## Strategie URL

Chaque sous-domaine represente un marche. La langue est portee dans le chemin quand plusieurs langues existent.

Exemples:

```text
https://creativapoeta.com/en
https://creativapoeta.com/fr
https://be.creativapoeta.com/fr
https://be.creativapoeta.com/nl
https://rw.creativapoeta.com/rw
https://rw.creativapoeta.com/fr
https://rw.creativapoeta.com/en
https://fr.creativapoeta.com
https://nl.creativapoeta.com
```

Les pages sans langue explicite redirigent vers la langue par defaut du marche, sauf decision SEO contraire.

## Modele de contenu

Le contenu doit etre structure par donnees, pas duplique a la main dans chaque page.

Entites principales:

- `markets`: pays, domaines, langues, devise, contact, adresse, horaires, profils locaux.
- `locales`: libelles communs, navigation, CTA, textes generiques.
- `services`: offres communes, variantes locales, prix indicatifs, benefices.
- `pages`: homepage, pages services, pages marche, FAQ, diagnostic, glossaire.
- `schema`: JSON-LD par marche, service, page et langue.
- `leadForms`: formulaires contact, brief projet, audit visibilite IA.

Exemple conceptuel:

```ts
markets = {
  be: {
    domains: ["be.creativapoeta.com"],
    defaultLocale: "fr",
    locales: ["fr", "nl"],
    currency: "EUR",
    country: "BE"
  },
  rw: {
    domains: ["rw.creativapoeta.com"],
    defaultLocale: "rw",
    locales: ["rw", "fr", "en"],
    currency: "RWF",
    country: "RW"
  }
}
```

## Positionnement

Ancien positionnement:

- creation de site web
- design graphique
- marketing digital
- contenu

Nouveau positionnement:

```text
Creativa Poeta rend les entreprises visibles, comprehensibles et recommandables par Google, ChatGPT, Perplexity, Siri, Apple Maps, Bing et les moteurs IA.
```

Les anciens services ne disparaissent pas. Ils deviennent les services de base qui soutiennent une offre plus differenciante.

## Nouvelle grille de services

### 1. AI Visibility & Local Discovery

Service prioritaire et differenciant.

Inclut:

- GEO, Generative Engine Optimization.
- AEO, Answer Engine Optimization.
- optimisation pour Google AI, ChatGPT, Perplexity, Siri, Copilot.
- Google Business Profile.
- Apple Business Connect.
- Bing Places.
- schema.org et knowledge graph.
- presence locale multilingue.

Pitch:

```text
Nous rendons votre entreprise visible et recommandable dans les recherches Google, les assistants IA, les cartes et les recherches vocales.
```

### 2. AI-Ready Websites

Evolution du service "creation de site web".

Inclut:

- sites rapides et lisibles sans JavaScript critique.
- rendu statique ou serveur.
- architecture multilingue et multi-marche.
- metadata, hreflang, sitemap et schema integres.
- pages services/locales.
- tracking des leads.

Pitch:

```text
Nous construisons des sites rapides, multilingues et structures pour etre compris par les humains, Google et les IA.
```

### 3. Programmatic Growth

Service avance pour capturer les requetes longues et precises.

Inclut:

- pSEO propre.
- moteurs de pages locales ou sectorielles.
- generation de contenu controlee.
- donnees structurees.
- maillage interne.
- sitemaps automatises.

Regle importante:

```text
On ne cree pas de pages faibles en masse. Chaque page doit repondre a une intention precise et apporter une valeur utile.
```

### 4. Brand, Content & Creative Systems

Services de base repositionnes.

Inclut:

- branding.
- design graphique.
- contenu.
- landing pages.
- social content.
- supports commerciaux.

Pitch:

```text
Nous transformons votre marque en contenu clair, coherent et exploitable sur tous les canaux.
```

## SEO international

Chaque page localisee doit avoir:

- un titre unique.
- une description unique.
- un canonical correct.
- des liens `hreflang` vers toutes les variantes pertinentes.
- un `x-default` pour la version globale ou la page de choix marche/langue.
- une entree sitemap.
- du contenu localise, pas seulement traduit.

Exemples de `hreflang` cibles:

```text
en
fr
fr-BE
nl-BE
fr-FR
rw-RW
fr-RW
en-RW
nl-NL
x-default
```

## AEO et GEO

Objectif: rendre le contenu exploitable par les moteurs de reponse et les assistants IA.

Principes:

- contenu principal disponible dans le HTML initial.
- reponses courtes et directes aux questions importantes.
- FAQ structurees.
- glossaire de concepts.
- JSON-LD par page.
- informations business coherentes entre site, Google, Apple, Bing et reseaux.
- pages de preuve: cas clients, methodologie, audits, exemples techniques.
- mentions externes: GitHub, LinkedIn, X, profils locaux, annuaires fiables.

Important:

```text
Le JSON-LD aide les machines a comprendre le site, mais ne garantit pas a lui seul les recommandations IA. L'autorite vient aussi des mentions externes, de la coherence des sources, de la qualite du contenu et des profils locaux verifies.
```

## Donnees structurees JSON-LD

Types Schema.org a utiliser:

- `Organization`
- `ProfessionalService`
- `LocalBusiness`
- `Service`
- `OfferCatalog`
- `FAQPage`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `Article` ou `TechArticle` pour le knowledge hub
- `HowTo` seulement quand le contenu est vraiment un tutoriel et respecte les guidelines

Chaque marche doit pouvoir generer un schema local avec:

- nom.
- URL.
- logo.
- description.
- zone desservie.
- langues.
- contact.
- adresse si disponible.
- liens sociaux.
- services.

## Indexation

La strategie ne doit pas dependre de l'API Google Indexing pour les pages normales.

Raison: l'API Google Indexing est officiellement limitee aux pages `JobPosting` et aux livestreams `BroadcastEvent` dans `VideoObject`. Elle ne doit pas etre vendue ni utilisee comme promesse principale pour indexer toutes les pages.

Approche recommandee:

- sitemaps propres par marche/langue.
- Search Console pour chaque sous-domaine.
- soumission sitemap.
- maillage interne fort.
- pages rapides et server-rendered/static.
- contenu utile et unique.
- IndexNow pour les moteurs compatibles.
- monitoring d'indexation et logs.

## Pages prioritaires

### Global

- Home globale.
- Services.
- AI Visibility.
- AI-Ready Websites.
- Programmatic Growth.
- Brand & Content.
- Diagnostic visibilite IA.
- Contact.
- Knowledge hub.

### Par marche

- Home marche.
- Services marche.
- Contact marche.
- FAQ marche.
- Pages services localisees.

### Knowledge hub

Premiers sujets:

- Qu'est-ce que le GEO ?
- Qu'est-ce que l'AEO ?
- Qu'est-ce que le SEO programmatique ?
- Comment rendre un site lisible par les IA ?
- Pourquoi Google Business Profile ne suffit plus ?
- Comment apparaitre dans Siri et Apple Maps ?
- Comment structurer une entreprise pour ChatGPT et Perplexity ?

Structure des articles:

- H1 clair.
- H2 sous forme de question.
- premiere reponse en moins de 30 mots.
- tableau ou liste.
- exemple concret.
- JSON-LD `Article` ou `TechArticle`.
- liens vers service correspondant.

## Lead magnet IA

Outil a construire:

```text
AI Visibility Audit
```

Parcours:

1. Le visiteur entre son URL.
2. L'outil analyse des signaux simples:
   - presence de metadata.
   - schema.org.
   - taille JS.
   - rendu HTML initial.
   - titre/description.
   - robots/sitemap.
   - vitesse approximative.
   - presence Google/Apple/Bing a completer manuellement ou via APIs plus tard.
3. L'outil donne un score.
4. Le visiteur laisse son email pour recevoir le rapport.
5. Le lead arrive dans le backend.

Version 1: analyse technique simple sans promesse excessive.

Version 2: generation IA du rapport.

## Touche IA

Ne pas commencer par un chatbot generique.

Fonctions IA utiles:

- assistant de brief projet.
- diagnostic de visibilite IA.
- generateur de plan de visibilite local.
- synthese automatique des demandes clients dans l'admin.

## Architecture technique recommandee

### Option recommandee: Next.js App Router

Avantages:

- metadata par page.
- rendu serveur/statique.
- routes dynamiques marche/langue.
- sitemap et robots dynamiques.
- JSON-LD propre.
- bonnes bases pour formulaires, IA et backend integration.

### Alternative: Astro

Avantages:

- excellent pour site vitrine statique.
- tres rapide.
- faible JavaScript.

Limite:

- moins naturel si on veut beaucoup de React interactif et une integration future avec outils IA/admin.

Decision recommandee:

```text
Migrer le frontend vers Next.js App Router pour la refonte.
```

## Deploiement

Etat actuel:

- Front: Netlify.
- Back: Vercel.
- DB: MongoDB Atlas.
- Media: Cloudinary.
- Email: Gmail App Password via Vercel.

Decision:

- garder Netlify tant que la refonte peut y etre deployee proprement.
- reevaluer Vercel pour le frontend si Next.js, sous-domaines, previews ou fonctions serveur deviennent plus simples a gerer sur Vercel.

## Checklist initiale

- [ ] Valider la liste des marches et langues.
- [ ] Valider la structure URL.
- [ ] Valider les 4 poles de services.
- [ ] Lister les services exacts de la nouvelle offre.
- [ ] Ecrire les textes source en francais ou anglais.
- [ ] Traduire/adapter par marche.
- [ ] Choisir Next.js ou Astro.
- [ ] Creer le modele `markets`.
- [ ] Creer le modele `services`.
- [ ] Creer le generateur metadata/hreflang.
- [ ] Creer le generateur JSON-LD.
- [ ] Creer sitemap/robots/llms.txt.
- [ ] Construire les premieres pages.
- [ ] Configurer les sous-domaines.
- [ ] Ajouter Search Console pour chaque sous-domaine.
- [ ] Ajouter profils Google Business, Apple Business Connect, Bing Places.

## Prochaine etape

Avant de coder, valider les services de la nouvelle offre.

Questions a trancher:

1. Quels services exacts Creativa Poeta vendra au lancement ?
2. Quels marches ont une vraie adresse, un numero, ou une presence locale ?
3. Quelle langue sert de source principale pour les textes: francais ou anglais ?
4. Veut-on migrer vers Next.js maintenant, ou documenter d'abord toute l'offre dans le Vite actuel ?

