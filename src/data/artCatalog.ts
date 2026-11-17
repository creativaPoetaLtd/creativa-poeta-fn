export type ArtLanguage = "fr" | "en" | "nl";
export type ArtText = Record<ArtLanguage, string>;
export const artText = (fr: string, en: string, nl: string): ArtText => ({ fr, en, nl });
export type ArtImage = { url: string; alt: ArtText };
export type ArtVariant = { id: string; material: string; format: string; priceCents: number; fulfillment: "studio" | "print_on_demand"; leadDaysMin: number; leadDaysMax: number; countries: string[]; available: boolean; provider?: string; providerReference?: string };

export type ArtCollection = {
  slug: string;
  name: string;
  subtitle: ArtText;
  description: ArtText;
  number: string;
  visual: "words" | "faith" | "landscape" | "architecture" | "custom";
};

export const artCollections: ArtCollection[] = [
  { slug: "words-of-life", name: "Words of Life", number: "01", visual: "words",
    subtitle: artText("L’art des mots", "The art of words", "De kunst van woorden"),
    description: artText("Des mots qui accompagnent, des pensées qui restent. Le courage, l’amour et la vie prennent forme dans des compositions typographiques essentielles.", "Words to live with, thoughts that stay. Courage, love and life take shape in thoughtful typographic compositions.", "Woorden die meegaan, gedachten die blijven. Moed, liefde en het leven krijgen vorm in heldere typografische composities.") },
  { slug: "faith-and-hope", name: "Faith & Hope", number: "02", visual: "faith",
    subtitle: artText("La foi exprimée par l’art", "Faith expressed through art", "Geloof uitgedrukt in kunst"),
    description: artText("Un espace pour la foi, la paix et l’espérance. Des créations sobres où le message trouve toute sa place, et où la lumière demeure.", "A space for faith, peace and hope. Quiet compositions that give the message room to breathe, and the light room to stay.", "Ruimte voor geloof, rust en hoop. Ingetogen creaties waarin de boodschap centraal staat en het licht blijft.") },
  { slug: "art-et-decoration", name: "Art & Décoration", number: "03", visual: "landscape",
    subtitle: artText("Des œuvres qui racontent", "Art that tells a story", "Kunst die verhalen vertelt"),
    description: artText("Paysages, abstractions et scènes symboliques. Chaque détail ouvre une histoire ; votre regard est libre d’en écrire la suite.", "Landscapes, abstractions and symbolic scenes. Every detail opens a story; your own eyes are free to write what comes next.", "Landschappen, abstracties en symbolische taferelen. Elk detail opent een verhaal; uw blik mag het vervolg schrijven.") },
  { slug: "cultures-et-identites", name: "Cultures & Identités", number: "04", visual: "architecture",
    subtitle: artText("Des racines et des horizons", "Roots and horizons", "Wortels en horizonten"),
    description: artText("Explorer les lieux, les héritages et les rencontres qui nous façonnent. Une collection ouverte sur la mémoire, la transmission et le sentiment d’appartenance.", "Explore the places, heritage and encounters that shape us. A collection about memory, passing things on and finding a sense of belonging.", "Ontdek de plekken, het erfgoed en de ontmoetingen die ons vormen. Een collectie over herinnering, overdracht en verbondenheid.") },
  { slug: "made-for-you", name: "Made for You", number: "05", visual: "custom",
    subtitle: artText("Votre histoire devient une création", "Your story becomes a creation", "Uw verhaal wordt een creatie"),
    description: artText("Une photo, un prénom, un souvenir ou une idée. Nous imaginons avec vous une création personnelle, pour offrir, se souvenir ou habiter un lieu autrement.", "A photograph, a name, a memory or an idea. Together, we imagine a personal creation to give, to remember or to bring a space to life.", "Een foto, een naam, een herinnering of een idee. Samen bedenken we een persoonlijke creatie om te schenken, te herinneren of een ruimte te laten leven.") },
];

export type ArtWork = {
  slug: string;
  collection: string;
  title: ArtText;
  sentence: ArtText;
  story: ArtText;
  details: { title: ArtText; text: ArtText }[];
  visual: ArtCollection["visual"];
  orientation: "landscape" | "portrait";
  // These are presentation specimens, never sellable inventory or a price offer.
  isDemo: boolean;
  id?: string;
  images?: ArtImage[];
  variants?: ArtVariant[];
  artist?: string;
};

export const artWorks: ArtWork[] = [
  { slug: "le-passage", collection: "art-et-decoration", visual: "landscape", orientation: "landscape", isDemo: true,
    title: artText("Le Passage", "The Passage", "De doorgang"),
    sentence: artText("Il y a des chemins qui commencent par un pas vers l’inconnu.", "Some journeys begin with a step into the unknown.", "Sommige wegen beginnen met een stap in het onbekende."),
    story: artText("Une silhouette avance vers une arche ouverte sur un horizon lumineux. Derrière elle, la pierre porte les traces du temps ; à ses côtés, l’eau poursuit son mouvement. Cette étude explore le moment où l’on choisit d’avancer, sans avoir besoin de tout connaître de l’autre côté.", "A figure approaches an arch opening onto a luminous horizon. Behind them, stone carries the marks of time; beside them, water keeps moving. This study explores the moment we choose to move forward without needing to know everything on the other side.", "Een figuur loopt naar een boog die uitkijkt op een lichte horizon. Achter hem draagt de steen de sporen van de tijd; naast hem blijft het water stromen. Deze studie verkent het moment waarop we vooruit durven gaan zonder alles aan de andere kant te kennen."),
    details: [
      { title: artText("L’arche", "The arch", "De boog"), text: artText("Une frontière qui devient une possibilité.", "A boundary becoming a possibility.", "Een grens die een mogelijkheid wordt.") },
      { title: artText("L’eau", "The water", "Het water"), text: artText("Le temps continue, même lorsque l’on hésite.", "Time moves on, even when we hesitate.", "De tijd gaat door, ook wanneer we twijfelen.") },
      { title: artText("La silhouette", "The figure", "De figuur"), text: artText("Petite dans le paysage, libre dans son choix.", "Small in the landscape, free in their choice.", "Klein in het landschap, vrij in zijn keuze.") },
    ] },
  { slug: "un-nouveau-depart", collection: "words-of-life", visual: "words", orientation: "portrait", isDemo: true,
    title: artText("Un nouveau départ", "A new beginning", "Een nieuw begin"),
    sentence: artText("Quelques mots pour laisser une place à ce qui vient.", "A few words to make room for what comes next.", "Een paar woorden om ruimte te maken voor wat komt."),
    story: artText("Une composition typographique qui laisse respirer les mots. Le rythme, les espaces et la simplicité rappellent qu’un commencement n’a pas besoin d’être spectaculaire pour avoir de la valeur. Une intention de création autour de l’élan et de la persévérance.", "A typographic composition that gives words room to breathe. Rhythm, space and simplicity remind us that a beginning does not have to be spectacular to matter. A creative study about momentum and perseverance.", "Een typografische compositie die woorden ademruimte geeft. Ritme, ruimte en eenvoud herinneren eraan dat een begin niet spectaculair hoeft te zijn om waardevol te zijn. Een creatieve studie over moed en volharding."),
    details: [
      { title: artText("Le rythme", "The rhythm", "Het ritme"), text: artText("Une lecture en deux temps, comme une respiration.", "Two moments of reading, like taking a breath.", "Twee leesmomenten, als een ademhaling.") },
      { title: artText("L’espace", "The space", "De ruimte"), text: artText("Du vide pour laisser la pensée continuer.", "Empty space that lets a thought continue.", "Lege ruimte waarin een gedachte verder kan groeien.") },
    ] },
  { slug: "memoire-des-lieux", collection: "cultures-et-identites", visual: "architecture", orientation: "portrait", isDemo: true,
    title: artText("Mémoire des lieux", "Memory of places", "Herinnering aan plekken"),
    sentence: artText("Nous portons quelque chose de chaque lieu que nous avons habité.", "We carry something of every place we have called home.", "We dragen iets mee van elke plek die ooit thuis was."),
    story: artText("Des passages se répondent, des matières anciennes rencontrent une pousse nouvelle. Cette étude imagine un lieu composé de souvenirs plutôt qu’une adresse précise. Les couches évoquent ce qui se transmet, se transforme et continue de vivre en nous.", "Passages echo one another; old surfaces meet a new green shoot. This study imagines a place made of memories rather than a precise address. Its layers evoke what is passed on, transformed and kept alive within us.", "Doorgangen beantwoorden elkaar; oude materialen ontmoeten een nieuwe groene scheut. Deze studie verbeeldt een plek uit herinneringen, geen precies adres. De lagen verwijzen naar wat wordt doorgegeven, verandert en in ons blijft leven."),
    details: [
      { title: artText("Les couches", "The layers", "De lagen"), text: artText("Une mémoire qui se construit sans tout effacer.", "A memory built without erasing everything before it.", "Een herinnering die groeit zonder alles uit te wissen.") },
      { title: artText("La pousse", "The new growth", "De nieuwe scheut"), text: artText("La vie trouve sa place au milieu de l’ancien.", "Life finds a place among what came before.", "Het leven vindt ruimte tussen het oude.") },
    ] },
  { slug: "une-lumiere-demeure", collection: "faith-and-hope", visual: "faith", orientation: "portrait", isDemo: true,
    title: artText("Une lumière demeure", "A light remains", "Een licht blijft"),
    sentence: artText("Une présence discrète, une espérance qui tient.", "A quiet presence, a hope that holds.", "Een stille aanwezigheid, hoop die standhoudt."),
    story: artText("Des mots simples, entourés d’espace et de lumière. Cette intention typographique parle de la confiance qui demeure lorsque les réponses tardent. Il s’agit d’une phrase de création, et non d’une citation biblique.", "Simple words surrounded by space and light. This typographic study speaks of trust that remains when answers take time. This is an original creative phrase, not a Bible quotation.", "Eenvoudige woorden, omringd door ruimte en licht. Deze typografische studie spreekt over vertrouwen dat blijft wanneer antwoorden op zich laten wachten. Dit is een eigen creatieve zin, geen Bijbelcitaat."),
    details: [
      { title: artText("La lumière", "The light", "Het licht"), text: artText("Une ouverture plutôt qu’une réponse imposée.", "An opening rather than an imposed answer.", "Een opening in plaats van een opgelegd antwoord.") },
      { title: artText("La sobriété", "The simplicity", "De eenvoud"), text: artText("Le message au premier plan, sans bruit autour.", "The message comes first, without distraction.", "De boodschap op de voorgrond, zonder afleiding.") },
    ] },
];

export const artMaterials = [
  { id: "canvas", label: artText("Toile sur châssis", "Stretched canvas", "Canvas op spieraam"), description: artText("De la matière et de la profondeur.", "Texture and depth.", "Textuur en diepte.") },
  { id: "poster", label: artText("Affiche encadrée", "Framed print", "Ingelijste poster"), description: artText("Une présence sobre et intemporelle.", "A quiet, timeless presence.", "Een ingetogen, tijdloze uitstraling.") },
  { id: "metal", label: artText("Aluminium", "Aluminium", "Aluminium"), description: artText("Des lignes nettes, un rendu contemporain.", "Clean lines, a contemporary finish.", "Heldere lijnen, een moderne afwerking.") },
  { id: "wood", label: artText("Bois", "Wood", "Hout"), description: artText("Un support chaleureux et singulier.", "A warm, distinctive surface.", "Een warm, karaktervol oppervlak.") },
  { id: "acrylic", label: artText("Acrylique", "Acrylic", "Acryl"), description: artText("De la lumière et de l’intensité.", "Light and intensity.", "Licht en intensiteit.") },
] as const;
