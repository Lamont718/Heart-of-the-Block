import type { Locale } from "../config";

/**
 * Translations for /recipes and /recipes/[slug]. Spanish solid; Haitian Creole
 * first pass — cooking terms especially want native review (see
 * docs/TRANSLATIONS-REVIEW.md). English comes from recipes-seed.ts; recipe
 * translations here are keyed by slug, with ingredients/steps/swaps as parallel
 * arrays (same order as the seed).
 */
export type RecipesChrome = {
  listEyebrow: string;
  listTitle: string;
  listIntro: string;
  listDisclaimer: string;
  metaTemplate: string; // uses {min} and {serves}
  allRecipes: string;
  ingredients: string;
  steps: string;
  heartSmartMoves: string;
  readMore: string;
  detailDisclaimer: string;
};

export const RECIPES_CHROME: Record<Locale, RecipesChrome> = {
  en: {
    listEyebrow: "Cook it",
    listTitle: "Heart-smart recipes",
    listIntro:
      "The food we actually cook — just a little kinder to your heart. Same flavor, with the swaps built in.",
    listDisclaimer:
      "Cooking guidance, not medical advice. Your doctor can help with what’s right for you.",
    metaTemplate: "⏱ {min} min · serves {serves}",
    allRecipes: "← All recipes",
    ingredients: "Ingredients",
    steps: "Steps",
    heartSmartMoves: "💚 The heart-smart moves",
    readMore: "Read more about it in Learn →",
    detailDisclaimer:
      "Cooking guidance, not medical advice. For what’s right for your heart, talk with your doctor.",
  },
  es: {
    listEyebrow: "Cocínalo",
    listTitle: "Recetas buenas para el corazón",
    listIntro:
      "La comida que de verdad cocinamos — solo un poco más amable con tu corazón. El mismo sabor, con los cambios ya incluidos.",
    listDisclaimer:
      "Guía de cocina, no consejo médico. Tu médico puede ayudarte con lo que es mejor para ti.",
    metaTemplate: "⏱ {min} min · {serves} porciones",
    allRecipes: "← Todas las recetas",
    ingredients: "Ingredientes",
    steps: "Pasos",
    heartSmartMoves: "💚 Los toques buenos para el corazón",
    readMore: "Lee más en Aprende →",
    detailDisclaimer:
      "Guía de cocina, no consejo médico. Para lo que es mejor para tu corazón, habla con tu médico.",
  },
  ht: {
    listEyebrow: "Kwit li",
    listTitle: "Resèt ki bon pou kè",
    listIntro:
      "Manje nou kwit toutbon — jis yon ti jan pi dous pou kè ou. Menm gou a, ak chanjman yo deja ladan.",
    listDisclaimer:
      "Konsèy pou kwit manje, se pa konsèy medikal. Doktè ou ka ede ou ak sa ki pi bon pou ou.",
    metaTemplate: "⏱ {min} min · {serves} pòsyon",
    allRecipes: "← Tout resèt yo",
    ingredients: "Engredyan",
    steps: "Etap",
    heartSmartMoves: "💚 Mouvman ki bon pou kè a",
    readMore: "Li plis nan Aprann →",
    detailDisclaimer:
      "Konsèy pou kwit manje, se pa konsèy medikal. Pou sa ki pi bon pou kè ou, pale ak doktè ou.",
  },
};

export type RecipeTr = {
  title: string;
  blurb: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  swaps: string[];
  why: string;
};

export const RECIPES_TR: Record<"es" | "ht", Record<string, RecipeTr>> = {
  es: {
    "heart-smart-oxtail": {
      title: "Oxtail saludable",
      blurb:
        "Oxtail rico y cocido a fuego lento — con menos de la grasa que se queda en la salsa.",
      tags: ["Caribeño", "Cena", "Bueno para el corazón"],
      ingredients: [
        "3 lb de oxtail (rabo de res), sin los trozos grandes de grasa dura",
        "1 cebolla, picada",
        "4 dientes de ajo, picados",
        "3 tallos de cebollín, picados",
        "Unas ramitas de tomillo fresco",
        "1 cdta de pimienta de Jamaica (pimento), en grano",
        "2 zanahorias, en trozos",
        "1 lata de habas (butter beans), escurridas y enjuagadas",
        "1 cdta de browning (opcional, para color)",
        "1 ají scotch bonnet, entero (opcional)",
        "Caldo bajo en sodio o agua para cubrir",
        "Arroz integral, para servir",
      ],
      steps: [
        "Sazona el oxtail ya limpio con ajo, cebollín, tomillo, pimento y solo un poco de sal. Déjalo reposar mientras preparas lo demás.",
        "Dora el oxtail por todos lados en una olla caliente, luego agrega la cebolla y un toque de browning.",
        "Vierte el caldo o agua hasta cubrir. Tapa y cocina a fuego bajo unas 2.5 horas, hasta que la carne se despegue del hueso.",
        "Agrega las zanahorias y las habas en los últimos 30 minutos.",
        "Deja reposar unos minutos, luego retira con una cuchara la grasa que sube a la salsa.",
        "Sirve sobre arroz integral.",
      ],
      swaps: [
        "Quita la grasa dura antes de dorar — la carne igual se despega del hueso.",
        "Retira la grasa que sube a la salsa después de cocinar.",
        "Rinde más con zanahorias y habas, para que una porción menor de carne llene el plato.",
        "Ve suave con el azúcar del browning y la sal — deja que el pimento, el tomillo y el scotch bonnet lleven el sabor.",
      ],
      why: "El mismo oxtail rico que se despega del hueso — solo con menos de la grasa saturada que le cuesta a tu corazón.",
    },
    "oven-fried-chicken": {
      title: "Pollo ‘frito’ al horno",
      blurb: "Crujiente, dorado, sazonado — sin la freidora.",
      tags: ["Soul food", "Cena", "Bueno para el corazón"],
      ingredients: [
        "8 piezas de pollo (a algunas, quítales la piel)",
        "1 taza de suero de leche (o yogur natural rebajado con agua)",
        "1 taza de harina integral o pan rallado sazonado",
        "1 cda de pimentón (paprika)",
        "2 cdtas de ajo en polvo",
        "1 cdta de pimienta negra",
        "½ cdta de cayena (al gusto)",
        "Un poco de sal",
        "Aceite en aerosol",
      ],
      steps: [
        "Remoja el pollo en el suero de leche por 30 minutos (o toda la noche).",
        "Mezcla la harina con el pimentón, el ajo en polvo, la pimienta, la cayena y un poco de sal.",
        "Cubre cada pieza presionando bien el empanizado, y colócala en una rejilla sobre una bandeja.",
        "Rocía la parte de arriba con aceite para que quede crujiente.",
        "Hornea a 425°F unos 40 minutos, volteando a la mitad, hasta que esté dorado y cocido por dentro (165°F).",
      ],
      swaps: [
        "Hornéalo (o usa air fryer) en vez de freírlo — el mismo crujido, mucha menos grasa.",
        "Quítale la piel a algunas piezas; ahí vive mucha de la grasa saturada.",
        "Sazona fuerte — ajo, pimentón, pimienta, cayena — para no extrañar nada.",
      ],
      why: "El mismo pollo del domingo con una fracción de la grasa de la freidora.",
    },
    "rice-and-peas-lighter": {
      title: "Arroz con habichuelas, más liviano",
      blurb:
        "El básico del domingo — con más fibra y un poco menos de grasa de coco.",
      tags: ["Caribeño", "Acompañante", "Fibra"],
      ingredients: [
        "2 tazas de arroz integral (o mitad integral, mitad blanco)",
        "1 lata de habichuelas rojas o gandules, escurridas y enjuagadas",
        "1 taza de leche de coco ligera",
        "3 dientes de ajo, picados",
        "2 tallos de cebollín",
        "Unas ramitas de tomillo",
        "½ cdta de pimienta de Jamaica (pimento)",
        "1 ají scotch bonnet, entero",
        "Agua, la necesaria",
      ],
      steps: [
        "En una olla, sofríe el ajo, el cebollín, el tomillo y el pimento por un minuto.",
        "Agrega las habichuelas, la leche de coco ligera y suficiente agua para cocer el arroz (revisa la proporción de tu arroz).",
        "Coloca el scotch bonnet entero encima (sin reventarlo) para dar sabor sin tanto picante.",
        "Incorpora el arroz, lleva a hervor, luego tapa y cocina a fuego bajo hasta que se absorba el líquido.",
        "Suelta el arroz con un tenedor y retira el scotch bonnet antes de servir.",
      ],
      swaps: [
        "Usa arroz integral — o empieza mitad integral, mitad blanco — para más fibra buena para el corazón.",
        "Usa leche de coco ligera, o menos de la entera.",
        "Deja que el coco, el ajo y el cebollín hablen, en vez de la sal.",
      ],
      why: "El mismo plato del domingo, con más fibra y menos grasa de coco.",
    },
    "garden-veggie-stir-fry": {
      title: "Salteado de verduras del huerto",
      blurb:
        "Un plato rápido y colorido lleno de fibra — sobre arroz integral.",
      tags: ["Rápido", "Fibra", "Verdura"],
      ingredients: [
        "1 brócoli, en floretes",
        "2 zanahorias, en rodajas finas",
        "1 pimiento, en tiras",
        "1 taza de habichuelas tiernas (green beans)",
        "3 dientes de ajo, picados",
        "1 cda de jengibre fresco, picado",
        "2 cdas de salsa de soya baja en sodio o tamari",
        "1 cdta de aceite de sésamo",
        "Un puñado de anacardos (cashews)",
        "Arroz integral, para servir",
      ],
      steps: [
        "Calienta bien una sartén o wok. Agrega un poco de aceite, luego el ajo y el jengibre por 30 segundos.",
        "Agrega primero las verduras más firmes (zanahoria, brócoli, habichuelas) y saltea unos minutos.",
        "Agrega el pimiento y revuelve hasta que todo esté vivo de color y apenas tierno.",
        "Echa la salsa de soya baja en sodio y el aceite de sésamo, revuelve, luego incorpora los anacardos.",
        "Sirve sobre arroz integral.",
      ],
      swaps: [
        "Salsa de soya baja en sodio en vez de la normal — gran ahorro de sodio.",
        "Llena el plato de verduras; que sean la comida.",
        "Los anacardos aportan grasas buenas y crujido — que el puñado siga siendo un puñado.",
      ],
      why: "Un plato entero de fibra y color en menos de media hora.",
    },
    "brothy-ginger-salmon-bowl": {
      title: "Tazón de salmón con jengibre en caldo",
      blurb: "Omega-3 para tu corazón en un tazón ligero y reconfortante.",
      tags: ["Pescado", "Grasas buenas", "Ligero"],
      ingredients: [
        "2 filetes de salmón",
        "4 tazas de caldo bajo en sodio",
        "1 cda de jengibre fresco, en rodajas",
        "2 dientes de ajo, aplastados",
        "1 tallo de cebollín",
        "2 tazas de bok choy o espinaca",
        "Una porción pequeña de fideos de arroz o arroz integral",
        "Limón, cilantro y ají para encima (opcional)",
      ],
      steps: [
        "Cocina el caldo a fuego lento con el jengibre, el ajo y el cebollín por 10 minutos para dar sabor.",
        "Coloca el salmón en el caldo y pochéalo suavemente hasta que esté apenas cocido, unos 6–8 minutos.",
        "Agrega las hojas verdes al final para que se ablanden.",
        "Cocina los fideos o el arroz aparte y añade una porción pequeña a cada tazón.",
        "Sirve el caldo y el salmón encima, y corona con limón, cilantro y ají.",
      ],
      swaps: [
        "Pochea el salmón en vez de freírlo.",
        "Usa caldo bajo en sodio para controlar la sal.",
        "Llena el tazón de verduras y deja pequeña la porción de fideos/arroz.",
      ],
      why: "El omega-3 del salmón es bueno para tu corazón — y un tazón en caldo lo mantiene ligero.",
    },
    "cornmeal-porridge": {
      title: "Crema de maíz especiada (cornmeal porridge)",
      blurb: "Un desayuno caliente que llena — con especias, sin tanto dulce.",
      tags: ["Caribeño", "Desayuno", "Fibra"],
      ingredients: [
        "½ taza de harina de maíz fina",
        "2 tazas de agua",
        "1 taza de leche baja en grasa o vegetal (la de avena va bien)",
        "½ cdta de canela",
        "¼ cdta de nuez moscada",
        "1 cdta de vainilla",
        "Un poco de endulzante al gusto (ve suave)",
        "Una pizca de sal",
      ],
      steps: [
        "Bate la harina de maíz en 1 taza del agua hasta que quede suave (sin grumos).",
        "Hierve el resto del agua, luego incorpora poco a poco la mezcla de maíz batiendo.",
        "Cocina a fuego bajo, revolviendo seguido, hasta que espese — unos 8–10 minutos.",
        "Agrega la leche, la canela, la nuez moscada, la vainilla y un poco de endulzante.",
        "Cocina un par de minutos más y sirve caliente.",
      ],
      swaps: [
        "Ve suave con la leche condensada/azucarada — las especias hacen el trabajo.",
        "Usa leche baja en grasa o vegetal.",
        "Apóyate en la canela, la nuez moscada y la vainilla para el sabor, en vez de más azúcar.",
      ],
      why: "Un comienzo del día caliente y que llena, que no te dispara el azúcar como un pan dulce.",
    },
    "everyday-red-lentil-dal": {
      title: "Dal de lentejas rojas para todos los días",
      blurb:
        "Barato, llena, y una de las mejores cosas que puedes cocinar para tu corazón — las lentejas hacen el trabajo.",
      tags: ["Sur de Asia", "A base de plantas", "Bueno para el corazón"],
      ingredients: [
        "1 taza de lentejas rojas, enjuagadas",
        "1 cebolla, picada",
        "3 dientes de ajo, picados",
        "1 cda de jengibre fresco, picado",
        "1 lata de tomate picado (sin sal añadida)",
        "1 cdta de cúrcuma",
        "1 cdta de comino",
        "½ cdta de chile en polvo (al gusto)",
        "1 cda de aceite (no mantequilla ni ghee)",
        "Caldo bajo en sodio o agua para cubrir",
        "Cilantro fresco y un chorrito de limón, para terminar",
        "Arroz integral o roti, para servir",
      ],
      steps: [
        "Calienta el aceite y ablanda la cebolla, luego agrega el ajo y el jengibre por un minuto.",
        "Incorpora la cúrcuma, el comino y el chile hasta que suelten aroma.",
        "Agrega las lentejas, el tomate y suficiente caldo o agua para cubrir por una pulgada.",
        "Cocina a fuego lento, revolviendo de vez en cuando, hasta que las lentejas se deshagan y quede cremoso — unos 20 minutos.",
        "Termina con cilantro y limón. Sirve sobre arroz integral o con roti.",
      ],
      swaps: [
        "Las lentejas aportan fibra y proteína casi sin grasa saturada — buenas para el corazón por naturaleza.",
        "Usa aceite en vez de ghee o mantequilla para reducir la grasa saturada.",
        "El tomate sin sal añadida y el caldo bajo en sodio mantienen el sodio bajo — las especias llevan el sabor.",
      ],
      why: "Una olla de esto alimenta a la familia por unos pocos dólares y le devuelve el cariño a tu corazón.",
    },
    "west-african-peanut-stew": {
      title: "Guiso de maní de África Occidental, más liviano",
      blurb:
        "Profundo, con sabor a nuez y reconfortante — hecho con maní y verduras en vez de mucha carne.",
      tags: ["África Occidental", "Con muchas plantas", "Bueno para el corazón"],
      ingredients: [
        "½ taza de mantequilla de maní natural (solo maní, sin azúcar ni sal añadida)",
        "1 cebolla, picada",
        "3 dientes de ajo, picados",
        "1 cda de jengibre fresco, picado",
        "1 lata de tomate picado (sin sal añadida)",
        "1 batata (camote), en cubos",
        "2 puñados grandes de espinaca o berza (collard greens), picada",
        "1 lata de garbanzos, escurridos y enjuagados",
        "1 cdta de hojuelas de chile (al gusto)",
        "1 cda de aceite",
        "Caldo bajo en sodio para cubrir",
        "Arroz integral, para servir",
      ],
      steps: [
        "Ablanda la cebolla en el aceite, luego agrega el ajo, el jengibre y el chile.",
        "Incorpora el tomate y la batata, luego vierte el caldo hasta cubrir.",
        "Bate la mantequilla de maní con un cucharón del caldo caliente hasta que quede suave, luego regrésala a la olla.",
        "Cocina a fuego lento hasta que la batata esté tierna, unos 20 minutos.",
        "Agrega los garbanzos y las verduras en los últimos 5 minutos, solo hasta que las hojas se ablanden.",
        "Sirve sobre arroz integral.",
      ],
      swaps: [
        "Mantequilla de maní natural (sin azúcar ni sal añadida) en vez de la endulzada.",
        "Los garbanzos y las verduras rinden la olla, así no necesitas mucha carne — ni nada de carne.",
        "Caldo bajo en sodio y tomate sin sal; deja que el maní, el jengibre y el chile hablen.",
      ],
      why: "Rico y satisfactorio gracias al maní y las verduras — el tipo de lleno que te hace bien.",
    },
  },
  ht: {
    "heart-smart-oxtail": {
      title: "Oxtail ki bon pou kè",
      blurb: "Oxtail rich, kwit dousman — ak mwens nan grès ki rete nan sòs la.",
      tags: ["Karayib", "Dine", "Bon pou kè"],
      ingredients: [
        "3 liv oxtail (ke bèf), retire gwo moso grès di yo",
        "1 zonyon, koupe",
        "4 gous lay, kraze",
        "3 branch sibilèt (echalòt), koupe",
        "Kèk branch ten fre",
        "1 ti kiyè grenn pimento (toujou-epis)",
        "2 kawòt, an moso",
        "1 bwat pwa bè (butter beans), egoute epi rense",
        "1 ti kiyè browning (opsyonèl, pou koulè)",
        "1 piman bouk (scotch bonnet), antye (opsyonèl)",
        "Bouyon ki ba nan sodyòm oswa dlo pou kouvri",
        "Diri konplè, pou sèvi",
      ],
      steps: [
        "Sezonen oxtail ou fin pare a ak lay, sibilèt, ten, pimento, ak yon ti kras sèl. Kite l poze pandan w ap prepare rès la.",
        "Brile oxtail la tout kote nan yon chodyè cho, answit mete zonyon ak yon ti browning.",
        "Vide bouyon oswa dlo pou kouvri. Kouvri epi kite l bouyi dousman apeprè 2 èdtan edmi, jiskaske vyann nan ap soti nan zo a.",
        "Mete kawòt ak pwa bè yo nan dènye 30 minit yo.",
        "Kite l poze kèk minit, answit retire grès ki monte anlè sòs la ak yon kiyè.",
        "Sèvi l sou diri konplè.",
      ],
      swaps: [
        "Retire grès di a anvan ou brile l — vyann nan ap toujou soti nan zo a.",
        "Retire grès ki monte anlè sòs la apre li fin kwit.",
        "Fè l dire ak kawòt ak pwa bè pou yon pi piti pòsyon vyann ranpli asyèt la.",
        "Pa mete twòp sik browning ak sèl — kite pimento, ten, ak piman bouk pote gou a.",
      ],
      why: "Menm oxtail rich ki soti nan zo a — jis mwens nan grès satire ki di pou kè ou.",
    },
    "oven-fried-chicken": {
      title: "Poul ‘fri’ nan fou",
      blurb: "Kwokan, dore, byen sezonen — san gwo chodyè lwil la.",
      tags: ["Soul food", "Dine", "Bon pou kè"],
      ingredients: [
        "8 moso poul (retire po a sou kèk)",
        "1 tas batmi (oswa yogout senp dilye ak dlo)",
        "1 tas farin ble konplè oswa chapli sezonen",
        "1 gwo kiyè paprika",
        "2 ti kiyè lay an poud",
        "1 ti kiyè pwav nwa",
        "½ ti kiyè kayèn (selon gou)",
        "Yon ti sèl",
        "Espre lwil pou kwit",
      ],
      steps: [
        "Tranpe poul la nan batmi pandan 30 minit (oswa tout nwit).",
        "Melanje farin nan ak paprika, lay an poud, pwav, kayèn, ak yon ti sèl.",
        "Woule chak moso ladan l, peze kouvèti a sou li, epi mete l sou yon griyaj anwo yon plak.",
        "Espre lwil sou tèt yo pou yo vin kwokan.",
        "Kwit nan fou a 425°F pandan apeprè 40 minit, vire yo nan mitan, jiskaske yo dore epi kwit anndan (165°F).",
      ],
      swaps: [
        "Kwit nan fou (oswa air fryer) olye fri nan lwil — menm kwokan an, anpil mwens grès.",
        "Retire po a sou kèk moso; se la anpil grès satire ye.",
        "Sezonen fò — lay, paprika, pwav, kayèn — pou ou pa manke anyen.",
      ],
      why: "Menm poul dimanch lan ak yon ti kras nan grès chodyè a.",
    },
    "rice-and-peas-lighter": {
      title: "Diri ak pwa, pi lejè",
      blurb: "Baz dimanch lan — ak plis fib ak yon ti kras mwens grès kokoye.",
      tags: ["Karayib", "Akonpayman", "Fib"],
      ingredients: [
        "2 tas diri konplè (oswa mwatye konplè, mwatye blan)",
        "1 bwat pwa wouj oswa pwa kongo, egoute epi rense",
        "1 tas lèt kokoye lejè",
        "3 gous lay, kraze",
        "2 branch sibilèt",
        "Kèk branch ten",
        "½ ti kiyè pimento (toujou-epis)",
        "1 piman bouk, antye",
        "Dlo selon bezwen",
      ],
      steps: [
        "Nan yon chodyè, sote lay, sibilèt, ten, ak pimento pandan yon minit.",
        "Mete pwa yo, lèt kokoye lejè a, ak ase dlo pou kwit diri a (tcheke pwopòsyon diri ou a).",
        "Mete piman bouk antye a anlè (pa pete l) pou gou san twòp pikan.",
        "Mete diri a ladan, kite l bouyi, answit kouvri epi kite l bouyi dousman jiskaske likid la absòbe.",
        "Lage diri a ak yon fouchèt epi retire piman bouk la anvan ou sèvi.",
      ],
      swaps: [
        "Itilize diri konplè — oswa kòmanse mwatye konplè, mwatye blan — pou plis fib ki bon pou kè.",
        "Itilize lèt kokoye lejè, oswa mwens nan sa ki gra a.",
        "Kite kokoye, lay, ak sibilèt pale olye sèl.",
      ],
      why: "Menm asyèt dimanch lan, ak plis fib ak mwens grès kokoye.",
    },
    "garden-veggie-stir-fry": {
      title: "Legim sote nan jaden",
      blurb: "Yon asyèt rapid, plen koulè ak fib — sou diri konplè.",
      tags: ["Rapid", "Fib", "Legim"],
      ingredients: [
        "1 tèt brokoli, an ti moso",
        "2 kawòt, koupe fen",
        "1 piman dou, koupe",
        "1 tas pwa tann (green beans)",
        "3 gous lay, kraze",
        "1 gwo kiyè jenjanm fre, kraze",
        "2 gwo kiyè sòs soya ki ba nan sodyòm oswa tamari",
        "1 ti kiyè lwil sezam",
        "Yon ponyen nwa kajou (cashews)",
        "Diri konplè, pou sèvi",
      ],
      steps: [
        "Chofe yon pwelon oswa wok byen cho. Mete yon ti lwil, answit lay ak jenjanm pou 30 segond.",
        "Mete legim ki pi di yo an premye (kawòt, brokoli, pwa tann) epi sote yo kèk minit.",
        "Mete piman an epi remye jiskaske tout bagay gen bèl koulè epi jis tann.",
        "Vide sòs soya ki ba nan sodyòm ak lwil sezam, remye, answit mete nwa kajou yo.",
        "Sèvi sou diri konplè.",
      ],
      swaps: [
        "Sòs soya ki ba nan sodyòm olye sa nòmal la — gwo ekonomi sodyòm.",
        "Plen asyèt la ak legim; kite yo se manje a.",
        "Nwa kajou ajoute bon grès ak kwokan — kenbe ponyen an yon ponyen.",
      ],
      why: "Yon asyèt antye fib ak koulè nan mwens pase yon demi èdtan.",
    },
    "brothy-ginger-salmon-bowl": {
      title: "Bòl somon ak jenjanm nan bouyon",
      blurb: "Omega-3 pou kè ou nan yon bòl lejè ki bay chalè.",
      tags: ["Pwason", "Bon grès", "Lejè"],
      ingredients: [
        "2 filè somon",
        "4 tas bouyon ki ba nan sodyòm",
        "1 gwo kiyè jenjanm fre, an tranch",
        "2 gous lay, kraze",
        "1 branch sibilèt",
        "2 tas bok choy oswa epina",
        "Yon ti pòsyon nouy diri oswa diri konplè",
        "Sitwon, kòryandr (cilantro), ak piman pou anlè (opsyonèl)",
      ],
      steps: [
        "Kite bouyon an bouyi dousman ak jenjanm, lay, ak sibilèt pandan 10 minit pou bati gou.",
        "Glise somon an nan bouyon an epi poche l dousman jiskaske li jis kwit, apeprè 6–8 minit.",
        "Mete fèy vèt yo nan fen an pou yo febli.",
        "Kwit nouy oswa diri a apa epi ajoute yon ti pòsyon nan chak bòl.",
        "Vide bouyon an ak somon an anlè, epi mete sitwon, kòryandr, ak piman.",
      ],
      swaps: [
        "Poche somon an olye fri l.",
        "Itilize bouyon ki ba nan sodyòm pou ou kontwole sèl la.",
        "Plen bòl la ak fèy vèt epi kenbe pòsyon nouy/diri a piti.",
      ],
      why: "Omega-3 somon an bon pou kè ou — epi yon bòl bouyon kenbe l lejè.",
    },
    "cornmeal-porridge": {
      title: "Labouyi mayi ak epis (cornmeal porridge)",
      blurb: "Yon manje maten cho ki plen vant — ak epis, pa twò dous.",
      tags: ["Karayib", "Manje maten", "Fib"],
      ingredients: [
        "½ tas farin mayi fen",
        "2 tas dlo",
        "1 tas lèt ki ba nan grès oswa lèt plant (lèt avwàn bon)",
        "½ ti kiyè kanèl",
        "¼ ti kiyè miskad",
        "1 ti kiyè vaniy",
        "Yon ti sikre selon gou (pa twòp)",
        "Yon ti kras sèl",
      ],
      steps: [
        "Bat farin mayi a nan 1 tas dlo a jiskaske li lis (san boul).",
        "Kite rès dlo a bouyi, answit dousman bat melanj mayi a ladan l.",
        "Kwit sou dife dous, brase souvan, jiskaske li epesi — apeprè 8–10 minit.",
        "Mete lèt la, kanèl, miskad, vaniy, ak yon ti sikre.",
        "Kwit kèk minit ankò epi sèvi l cho.",
      ],
      swaps: [
        "Pa mete twòp lèt kondanse/sikre — epis yo fè travay la.",
        "Itilize lèt ki ba nan grès oswa lèt plant.",
        "Apiye sou kanèl, miskad, ak vaniy pou gou olye plis sik.",
      ],
      why: "Yon kòmansman jounen cho ki plen vant, ki p ap fè sik ou monte tankou yon ti pen dous.",
    },
    "everyday-red-lentil-dal": {
      title: "Dal pwa lantiy wouj pou chak jou",
      blurb:
        "Pa chè, li plen vant, epi se youn nan pi bon bagay ou ka kwit pou kè ou — pwa lantiy yo fè travay la.",
      tags: ["Sid Azi", "Ak plant", "Bon pou kè"],
      ingredients: [
        "1 tas pwa lantiy wouj, rense",
        "1 zonyon, koupe",
        "3 gous lay, kraze",
        "1 gwo kiyè jenjanm fre, kraze",
        "1 bwat tomat koupe (san sèl ajoute)",
        "1 ti kiyè kurkuma (turmeric)",
        "1 ti kiyè konmen (cumin)",
        "½ ti kiyè piman an poud (selon gou)",
        "1 gwo kiyè lwil (pa bè ni ghee)",
        "Bouyon ki ba nan sodyòm oswa dlo pou kouvri",
        "Kòryandr fre ak yon ti sitwon, pou fini",
        "Diri konplè oswa woti (roti), pou sèvi",
      ],
      steps: [
        "Chofe lwil la epi fè zonyon an vin mou, answit mete lay ak jenjanm pou yon minit.",
        "Mete kurkuma, konmen, ak piman jiskaske yo santi bon.",
        "Mete pwa lantiy yo, tomat la, ak ase bouyon oswa dlo pou kouvri yon pous anwo.",
        "Kite l bouyi dousman, brase tanzantan, jiskaske pwa lantiy yo defèt epi li vin krèm — apeprè 20 minit.",
        "Fini ak kòryandr ak sitwon. Sèvi sou diri konplè oswa ak woti.",
      ],
      swaps: [
        "Pwa lantiy bay fib ak pwoteyin prèske san grès satire — natirèlman bon pou kè.",
        "Itilize lwil olye ghee oswa bè pou koupe grès satire a.",
        "Tomat san sèl ajoute ak bouyon ki ba nan sodyòm kenbe sodyòm nan ba — epis yo pote gou a.",
      ],
      why: "Yon chodyè sa a bay manje pou tout fanmi an pou kèk dola epi li renmen kè ou ankò.",
    },
    "west-african-peanut-stew": {
      title: "Bouyon manba Afrik Lwès, pi lejè",
      blurb:
        "Fon, ak gou pistach, epi li bay chalè — fèt ak manba ak fèy vèt olye anpil vyann.",
      tags: ["Afrik Lwès", "Plis plant", "Bon pou kè"],
      ingredients: [
        "½ tas manba natirèl (sèlman pistach, san sik ni sèl ajoute)",
        "1 zonyon, koupe",
        "3 gous lay, kraze",
        "1 gwo kiyè jenjanm fre, kraze",
        "1 bwat tomat koupe (san sèl ajoute)",
        "1 patat dous, an moso",
        "2 gwo ponyen epina oswa fèy chou (collard greens), koupe",
        "1 bwat pwa chich (chickpeas), egoute epi rense",
        "1 ti kiyè kal piman (selon gou)",
        "1 gwo kiyè lwil",
        "Bouyon ki ba nan sodyòm pou kouvri",
        "Diri konplè, pou sèvi",
      ],
      steps: [
        "Fè zonyon an vin mou nan lwil la, answit mete lay, jenjanm, ak piman.",
        "Mete tomat la ak patat dous la, answit vide bouyon pou kouvri.",
        "Bat manba a ak yon louch bouyon cho jiskaske li lis, answit remete l nan chodyè a.",
        "Kite l bouyi dousman jiskaske patat dous la vin mou, apeprè 20 minit.",
        "Mete pwa chich yo ak fèy vèt yo nan dènye 5 minit yo, jis jiskaske fèy yo febli.",
        "Sèvi sou diri konplè.",
      ],
      swaps: [
        "Manba natirèl (san sik ni sèl ajoute) olye sa ki sikre a.",
        "Pwa chich ak fèy vèt fè chodyè a dire pou ou pa bezwen anpil vyann — oswa okenn vyann.",
        "Bouyon ki ba nan sodyòm ak tomat san sèl; kite manba, jenjanm, ak piman pale.",
      ],
      why: "Rich epi satisfezan gras a pistach ak legim — kalite plen vant ki fè ou byen.",
    },
  },
};
