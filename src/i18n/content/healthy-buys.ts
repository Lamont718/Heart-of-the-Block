import type { Locale } from "../config";

/**
 * Translations for /healthy-buys. Spanish solid; Haitian Creole first pass
 * (native review pending). Store NAMES stay English (BJ's, Aldi, ShopRite…).
 * Staple translations are parallel arrays — same order as store-staples-seed.ts.
 * English comes from the seed; only es/ht live here.
 */
export type HbChrome = {
  eyebrow: string;
  title: string;
  intro: string;
  disclaimerLead: string;
  disclaimerBody: string; // use {date}
  footerNote: string;
  footerCta: string;
  footerDisclaimer: string;
};

export const HB_CHROME: Record<Locale, HbChrome> = {
  en: {
    eyebrow: "Shop smart",
    title: "Healthy staples & what they cost",
    intro:
      "Eating heart-smart on a budget is real. Here’s what to grab at the stores around the way — and roughly what the good stuff costs — so you can walk in with a plan.",
    disclaimerLead: "About the prices:",
    disclaimerBody:
      " these are typical Brooklyn estimates, last checked {date}. Grocery prices change week to week and store to store, so treat every ~ price as a ballpark — always check the shelf. Spot a better price? That’s a win.",
    footerNote:
      "Want to find these stores — plus markets and farmers markets — near you?",
    footerCta: "Open the directory",
    footerDisclaimer:
      "Education, not medical advice. Always talk to your doctor about what’s right for you.",
  },
  es: {
    eyebrow: "Compra inteligente",
    title: "Productos básicos saludables y lo que cuestan",
    intro:
      "Comer sano con poco dinero es posible. Esto es lo que puedes conseguir en las tiendas del barrio — y más o menos lo que cuesta lo bueno — para que entres con un plan.",
    disclaimerLead: "Sobre los precios:",
    disclaimerBody:
      " son estimados típicos de Brooklyn, revisados por última vez en {date}. Los precios del supermercado cambian de semana a semana y de tienda a tienda, así que toma cada precio ~ como un aproximado — siempre revisa el estante. ¿Encuentras un mejor precio? Eso es una victoria.",
    footerNote:
      "¿Quieres encontrar estas tiendas — además de mercados y mercados de agricultores — cerca de ti?",
    footerCta: "Abre el directorio",
    footerDisclaimer:
      "Educación, no consejo médico. Habla siempre con tu médico sobre lo que es mejor para ti.",
  },
  ht: {
    eyebrow: "Achte avèk lespri",
    title: "Manje debaz ki bon pou sante ak konbyen yo koute",
    intro:
      "Manje ki bon pou kè ak yon ti bidjè se yon bagay reyèl. Men sa pou ou pran nan magazen nan zòn nan — ak apeprè konbyen bon bagay yo koute — pou ou antre ak yon plan.",
    disclaimerLead: "Sou pri yo:",
    disclaimerBody:
      " se estimasyon tipik Brooklyn, dènye fwa nou tcheke se {date}. Pri makèt yo chanje chak semèn ak chak magazen, kidonk konsidere chak pri ~ kòm yon apeprè — toujou gade sou etajè a. Ou jwenn yon pi bon pri? Sa se yon viktwa.",
    footerNote:
      "Ou vle jwenn magazen sa yo — plis mache ak mache fèmye — toupre ou?",
    footerCta: "Louvri anyè a",
    footerDisclaimer:
      "Edikasyon, se pa konsèy medikal. Toujou pale ak doktè ou sou sa ki pi bon pou ou.",
  },
};

export type HbStore = {
  kind: string;
  blurb: string;
  note?: string;
  staples: { name: string; why: string }[];
};

export const HB_STORES: Record<"es" | "ht", Record<string, HbStore>> = {
  es: {
    bjs: {
      kind: "Club de almacén",
      blurb:
        "Ideal para comprar lo básico al por mayor y dividirlo con familia o vecinos.",
      note:
        "Requiere membresía. Vale la pena si cocinas mucho en casa o compras para una familia grande.",
      staples: [
        { name: "Arroz integral (10 lb)", why: "Grano entero — mucha más fibra que el arroz blanco." },
        { name: "Frijoles secos (4 lb)", why: "Proteína y fibra sin sal añadida. Remoja y congela." },
        { name: "Salmón salvaje en lata (paquete de 6)", why: "Grasas omega-3 que son buenas para tu corazón." },
        { name: "Verduras mixtas congeladas (4 lb)", why: "Sin preparación, sin sal, listas en el congelador por semanas." },
        { name: "Avena tradicional (10 lb)", why: "Comida con regularidad, la avena ayuda a bajar el colesterol." },
        { name: "Aceite de oliva (2 L)", why: "Una grasa más sana para el corazón que la mantequilla o la manteca." },
        { name: "Huevos (24 unidades)", why: "Proteína económica que rinde toda la semana." },
      ],
    },
    aldi: {
      kind: "Supermercado de descuento",
      blurb:
        "Casi siempre los precios más bajos del barrio en lo básico y saludable de cada día.",
      note: "Lleva tus propias bolsas y una moneda de 25¢ para el carrito.",
      staples: [
        { name: "Frijoles negros en lata (15 oz)", why: "Casi la proteína más barata que hay. Enjuaga para quitar la sal." },
        { name: "Brócoli congelado (12 oz)", why: "Fibra y vitamina C que dura meses." },
        { name: "Bananas (por libra)", why: "El potasio ayuda a controlar la presión arterial." },
        { name: "Avena en hojuelas (42 oz)", why: "Un desayuno bueno para el corazón por centavos el plato." },
        { name: "Arroz integral (2 lb)", why: "Un cambio fácil de grano entero por el arroz blanco." },
        { name: "Huevos (docena)", why: "Muchas veces el precio de huevos más bajo de la zona." },
        { name: "Mantequilla de maní natural", why: "Busca la que es solo maní — sin azúcar ni aceite añadidos." },
      ],
    },
    shoprite: {
      kind: "Supermercado",
      blurb:
        "Gran variedad y ofertas semanales — carga la tarjeta Price Plus para los descuentos.",
      staples: [
        { name: "Frijoles rojos secos (1 lb)", why: "Arroz con habichuelas, hecho sano con fibra de verdad." },
        { name: "Tomates en lata sin sal (28 oz)", why: "Una base para guisos sin el golpe de sodio." },
        { name: "Verduras mixtas congeladas (12 oz)", why: "Echa un puñado a casi cualquier cosa." },
        { name: "Batatas (por libra)", why: "Fibra y dulzura natural, sin azúcar añadida." },
        { name: "Salmón en lata (5 oz)", why: "Omega-3 que se conserva, para tortitas de salmón o ensalada." },
        { name: "Caldo de pollo bajo en sodio", why: "Dale sabor a tu olla sin la sal." },
        { name: "Avena tradicional (18 oz)", why: "Buena para el colesterol y llena." },
      ],
    },
    keyfood: {
      kind: "Supermercado del barrio",
      blurb:
        "Justo en la cuadra, y surtido con la comida que Brooklyn de verdad cocina.",
      staples: [
        { name: "Collard (manojo)", why: "Las hojas verdes son excelentes — solo ve suave con la carne de cerdo salada." },
        { name: "Plátanos (cada uno)", why: "Hornéalos o hiérvelos en vez de freírlos." },
        { name: "Sardinas en lata", why: "Pez pequeño, mucho omega-3, precio pequeño." },
        { name: "Batatas (por libra)", why: "Un básico de la cena del domingo, un poco más sano." },
        { name: "Gandules secos (1 lb)", why: "Para arroz con gandules con fibra de verdad." },
        { name: "Huevos (docena)", why: "Proteína que rinde mucho." },
        { name: "Arroz integral (2 lb)", why: "Cámbialo por el arroz blanco poco a poco." },
      ],
    },
    ctown: {
      kind: "Tienda del barrio",
      blurb: "Confiable para lo básico, barato y que llena, cerca de casa.",
      staples: [
        { name: "Repollo (una cabeza)", why: "Barato, llena y bueno para ti — rinde la comida." },
        { name: "Frijoles secos (1 lb)", why: "Remoja toda la noche y ahorra frente a los de lata." },
        { name: "Bananas (por libra)", why: "Potasio para llevar." },
        { name: "Frijoles en lata (15 oz)", why: "¿Sin tiempo para remojar? Enjuaga la lata para quitar la sal." },
        { name: "Cebollas y ajo (3 lb)", why: "Crea sabor sin recurrir a la sal." },
        { name: "Avena (18 oz)", why: "Empieza el día bien para el corazón." },
        { name: "Espinaca congelada", why: "Hierro y fibra que dura meses." },
      ],
    },
    traderjoes: {
      kind: "Tienda especializada",
      blurb:
        "Menos sucursales, pero lo básico barato y limpio, con listas de ingredientes cortas.",
      note: "No está en todos los barrios — vale el viaje por lo básico de abajo.",
      staples: [
        { name: "Arroz integral congelado (paquete de 3)", why: "Arroz de grano entero en 3 minutos, sin olla que vigilar." },
        { name: "Frijoles en lata sin sal añadida", why: "Lista de ingredientes limpia — solo frijoles y agua." },
        { name: "Nueces mixtas sin sal", why: "Una merienda buena para el corazón — limita la porción a un puñado." },
        { name: "Salmón salvaje congelado", why: "Omega-3 a buen precio, directo del congelador." },
        { name: "Avena en hojuelas", why: "De la avena limpia más barata que hay." },
        { name: "Bananas (cada una)", why: "La famosa banana de 19¢ — potasio por casi nada." },
        { name: "Bayas mixtas congeladas", why: "Antioxidantes sin azúcar añadida." },
      ],
    },
  },
  ht: {
    bjs: {
      kind: "Klèb an gwo",
      blurb:
        "Pi bon pou achte bagay debaz an gwo epi pataje ak fanmi oswa vwazen.",
      note:
        "Mande manm. Li vo lapèn si ou kwit manje lakay anpil oswa ou achte pou yon gwo fwaye.",
      staples: [
        { name: "Diri konplè (10 lb)", why: "Grenn antye — anpil plis fib pase diri blan." },
        { name: "Pwa sèk (4 lb)", why: "Pwoteyin ak fib san sèl anplis. Tranpe epi konjle." },
        { name: "Somon sovaj nan bwat (6 pak)", why: "Grès omega-3 ki bon pou kè ou." },
        { name: "Legim melanje konjle (4 lb)", why: "San preparasyon, san sèl, pare nan frizè pou plizyè semèn." },
        { name: "Avwàn tradisyonèl (10 lb)", why: "Lè ou manje l regilyèman, avwàn ede bese kolestewòl." },
        { name: "Lwil oliv (2 L)", why: "Yon grès ki pi bon pou kè pase bè oswa grès kochon." },
        { name: "Ze (24 grenn)", why: "Pwoteyin abòdab ki dire tout semèn nan." },
      ],
    },
    aldi: {
      kind: "Makèt rabè",
      blurb:
        "Pifò tan pri ki pi ba nan katye a pou bagay debaz ki bon pou sante chak jou.",
      note: "Pote pwòp sak ou ak yon pyès 25¢ pou charyo a.",
      staples: [
        { name: "Pwa nwa nan bwat (15 oz)", why: "Apeprè pwoteyin ki pi bon mache ki genyen. Rense pou retire sèl la." },
        { name: "Brokoli konjle (12 oz)", why: "Fib ak vitamin C ki konsève pandan plizyè mwa." },
        { name: "Bannann (pa liv)", why: "Potasyòm ede kontwole tansyon." },
        { name: "Avwàn an grenn plat (42 oz)", why: "Yon manje maten ki bon pou kè pou kèk santim bòl la." },
        { name: "Diri konplè (2 lb)", why: "Yon chanjman fasil grenn antye pou ranplase diri blan." },
        { name: "Ze (douzèn)", why: "Souvan pi ba pri ze nan zòn nan." },
        { name: "Manba natirèl", why: "Chèche sa ki se jis pistach — san sik ni lwil anplis." },
      ],
    },
    shoprite: {
      kind: "Makèt",
      blurb:
        "Gwo seleksyon ak òf chak semèn — chaje kat Price Plus la pou jwenn rabè yo.",
      staples: [
        { name: "Pwa wouj sèk (1 lb)", why: "Diri ak pwa, fèt pou kè ak vrè fib." },
        { name: "Tomat nan bwat san sèl (28 oz)", why: "Yon baz pou bouyon san anpil sodyòm." },
        { name: "Legim melanje konjle (12 oz)", why: "Mete yon ponyen nan prèske nenpòt bagay." },
        { name: "Patat dous (pa liv)", why: "Fib ak dousè natirèl, san sik anplis." },
        { name: "Somon nan bwat (5 oz)", why: "Omega-3 ki konsève, pou kwoket somon oswa salad." },
        { name: "Bouyon poul ki ba nan sodyòm", why: "Bay chodyè ou gou san sèl." },
        { name: "Avwàn tradisyonèl (18 oz)", why: "Bon pou kolestewòl epi li plen vant." },
      ],
    },
    keyfood: {
      kind: "Makèt katye",
      blurb: "Sou blòk la menm, epi li gen manje Brooklyn kwit toutbon.",
      staples: [
        { name: "Fèy collard (yon pakèt)", why: "Fèy vèt yo bon anpil — jis pa mete twòp vyann kochon sale." },
        { name: "Bannann (chak)", why: "Kwit yo nan fou oswa bouyi yo olye fri yo." },
        { name: "Sadin nan bwat", why: "Ti pwason, anpil omega-3, ti pri." },
        { name: "Patat dous (pa liv)", why: "Yon baz dine dimanch, fèt yon ti jan pi bon pou ou." },
        { name: "Pwa kongo sèk (1 lb)", why: "Pou diri ak pwa ki gen vrè fib ladan l." },
        { name: "Ze (douzèn)", why: "Pwoteyin ki ale lwen." },
        { name: "Diri konplè (2 lb)", why: "Ranplase diri blan an piti piti." },
      ],
    },
    ctown: {
      kind: "Boutik katye",
      blurb: "Serye pou bagay debaz bon mache ki plen vant, toupre lakay.",
      staples: [
        { name: "Chou (yon tèt)", why: "Bon mache, plen vant, epi bon pou ou — li fè manje a dire." },
        { name: "Pwa sèk (1 lb)", why: "Tranpe l tout nwit epi ekonomize parapò ak sa nan bwat." },
        { name: "Bannann (pa liv)", why: "Potasyòm pou pran ale." },
        { name: "Pwa nan bwat (15 oz)", why: "Pa gen tan pou tranpe? Rense bwat la pou retire sèl." },
        { name: "Zonyon ak lay (3 lb)", why: "Bati gou san ou pa pran sèl." },
        { name: "Avwàn (18 oz)", why: "Kòmanse jounen an byen pou kè." },
        { name: "Epina konjle", why: "Fè ak fib ki konsève pandan plizyè mwa." },
      ],
    },
    traderjoes: {
      kind: "Magazen espesyalize",
      blurb:
        "Mwens kote, men bagay debaz bon mache ak senp, ak lis engredyan kout.",
      note: "Pa nan tout katye — li vo vwayaj la pou bagay debaz anba yo.",
      staples: [
        { name: "Diri konplè konjle (3 pak)", why: "Diri grenn antye nan 3 minit, pa gen chodyè pou veye." },
        { name: "Pwa nan bwat san sèl anplis", why: "Lis engredyan pwòp — jis pwa ak dlo." },
        { name: "Nwa melanje san sèl", why: "Yon ti goute ki bon pou kè — kenbe pòsyon an nan yon ponyen." },
        { name: "Somon sovaj konjle", why: "Omega-3 a bon pri, dirèkteman nan frizè." },
        { name: "Avwàn an grenn plat", why: "Pami avwàn pwòp ki pi bon mache." },
        { name: "Bannann (chak)", why: "Bannann 19¢ ki popilè a — potasyòm pou prèske anyen." },
        { name: "Fwi wouj melanje konjle", why: "Antioksidan san sik anplis." },
      ],
    },
  },
};
