import type { Locale } from "../config";

/**
 * Translations for /money-for-produce. Spanish solid; Haitian Creole first pass
 * (native review pending). Program NAMES stay in English (Health Bucks, SNAP,
 * WIC, etc. are proper nouns); the descriptions translate. English comes from
 * the seed (produce-programs-seed.ts) — only es/ht overrides live here.
 */
export type MfpChrome = {
  eyebrow: string;
  title: string;
  intro: string;
  disclaimerLead: string;
  /** Use {date} where the "last checked" value goes. */
  disclaimerBody: string;
  statusActive: string;
  statusVerify: string;
  whatYouGet: string;
  whoQualifies: string;
  howToGet: string;
  footerNote: string;
  footerCta: string;
  footerDisclaimer: string;
};

export const MFP_CHROME: Record<Locale, MfpChrome> = {
  en: {
    eyebrow: "Eat well for less",
    title: "Money for produce",
    intro:
      "Eating healthy shouldn’t cost more. New York runs real programs that put money toward fruits and vegetables — and a lot of people who qualify never hear about them. Here’s what’s out there and how to get it.",
    disclaimerLead: "Heads up:",
    disclaimerBody:
      " benefit programs and amounts change. We link to each program’s official source — always confirm the details there. Last checked {date}. Programs marked “Confirm it’s running” are worth a quick call before you count on them.",
    statusActive: "Available",
    statusVerify: "Confirm it’s running",
    whatYouGet: "What you get",
    whoQualifies: "Who qualifies",
    howToGet: "How to get it",
    footerNote:
      "Most of these work at farmers markets. Find ones near you on the map.",
    footerCta: "Find markets near you",
    footerDisclaimer:
      "Heart of the Block isn’t affiliated with these programs — we just point the way. This is information, not benefits or medical advice.",
  },
  es: {
    eyebrow: "Come bien por menos",
    title: "Dinero para frutas y verduras",
    intro:
      "Comer sano no debería costar más. Nueva York tiene programas reales que destinan dinero a frutas y verduras — y mucha gente que califica nunca se entera. Aquí está lo que existe y cómo obtenerlo.",
    disclaimerLead: "Ojo:",
    disclaimerBody:
      " los programas de beneficios y los montos cambian. Enlazamos a la fuente oficial de cada programa — confirma siempre los detalles allí. Última revisión: {date}. Los programas marcados con «Confirma que sigue activo» merecen una llamada rápida antes de contar con ellos.",
    statusActive: "Disponible",
    statusVerify: "Confirma que sigue activo",
    whatYouGet: "Qué recibes",
    whoQualifies: "Quién califica",
    howToGet: "Cómo obtenerlo",
    footerNote:
      "La mayoría funcionan en los mercados de agricultores. Encuentra los que tienes cerca en el mapa.",
    footerCta: "Encuentra mercados cerca de ti",
    footerDisclaimer:
      "Heart of the Block no está afiliado a estos programas — solo te mostramos el camino. Esto es información, no beneficios ni consejo médico.",
  },
  ht: {
    eyebrow: "Manje byen pou mwens",
    title: "Lajan pou fwi ak legim",
    intro:
      "Manje sante pa ta dwe koute plis. New York gen pwogram reyèl ki mete lajan sou fwi ak legim — epi anpil moun ki kalifye pa janm tande pale de yo. Men sa ki egziste ak kijan pou jwenn li.",
    disclaimerLead: "Atansyon:",
    disclaimerBody:
      " pwogram benefis ak montan yo chanje. Nou mete lyen sou sous ofisyèl chak pwogram — toujou konfime detay yo la. Dènye fwa nou tcheke: {date}. Pwogram ki make « Konfime li toujou ap mache » merite yon ti apèl anvan ou konte sou yo.",
    statusActive: "Disponib",
    statusVerify: "Konfime li toujou ap mache",
    whatYouGet: "Sa ou jwenn",
    whoQualifies: "Kiyès ki kalifye",
    howToGet: "Kijan pou jwenn li",
    footerNote:
      "Pifò nan yo mache nan mache fèmye yo. Jwenn sa ki toupre ou sou kat la.",
    footerCta: "Jwenn mache toupre ou",
    footerDisclaimer:
      "Heart of the Block pa afilye ak pwogram sa yo — nou jis montre chemen an. Sa a se enfòmasyon, se pa benefis ni konsèy medikal.",
  },
};

export type ProgFields = {
  tagline: string;
  whatYouGet: string;
  whoQualifies: string;
  howToGet: string;
  linkLabel: string;
  statusNote?: string;
};

export const MFP_PROGRAMS: Record<"es" | "ht", Record<string, ProgFields>> = {
  es: {
    "health-bucks": {
      tagline:
        "$2 de vuelta por cada $5 que gastes con SNAP en los mercados de agricultores.",
      whatYouGet:
        "En los mercados de agricultores de NYC, cada $5 que gastes con tu tarjeta EBT te da un cupón de $2 en Health Bucks para comprar más frutas y verduras. Las organizaciones comunitarias también los reparten.",
      whoQualifies:
        "Cualquier persona que compre con SNAP/EBT en un mercado participante — y quienes los reciben a través de organizaciones comunitarias.",
      howToGet:
        "Compra con tu tarjeta EBT en un mercado de agricultores participante de NYC y pide tus Health Bucks en la mesa de información del mercado.",
      linkLabel: "NYC Health Bucks (oficial)",
    },
    "pharmacy-to-farm": {
      tagline: "$30 al mes en Health Bucks si tienes presión alta + SNAP.",
      whatYouGet:
        "$30 en Health Bucks cada mes para gastar en frutas y verduras en los mercados de agricultores de NYC — pensado para quienes manejan la presión alta.",
      whoQualifies:
        "Participantes de SNAP con presión arterial alta, inscritos a través de una farmacia participante.",
      howToGet:
        "Pregunta a tu farmacéutico si participa en el programa Pharmacy to Farm.",
      linkLabel: "Más sobre Health Bucks (NYC)",
      statusNote:
        "El financiamiento de este programa ha cambiado con los años — confirma con tu farmacéutico que sigue activo antes de contar con él.",
    },
    "hh-produce-box": {
      tagline:
        "Meses de cajas de frutas y verduras gratis para pacientes que califican.",
      whatYouGet:
        "Los pacientes que califican reciben cajas mensuales de frutas y verduras gratis durante varios meses, además de apoyo para comer más vegetales — a través del Lifestyle Medicine Program.",
      whoQualifies:
        "Pacientes en sedes participantes de NYC Health + Hospitals. La disponibilidad varía según el lugar.",
      howToGet:
        "Pregunta a tu proveedor de NYC Health + Hospitals sobre el Lifestyle Medicine Program.",
      linkLabel: "NYC Health + Hospitals",
      statusNote:
        "Pregunta a tu proveedor — qué sedes participan y cómo inscribirse puede cambiar.",
    },
    "fresh-food-box": {
      tagline:
        "Cajas de frutas y verduras frescas a bajo costo, en el mismo barrio.",
      whatYouGet:
        "Una caja de frutas y verduras frescas, en su mayoría locales, muy por debajo del precio de la tienda. Acepta SNAP/EBT y Health Bucks.",
      whoQualifies: "Abierto a todos — sin requisito de ingresos.",
      howToGet:
        "Encuentra un sitio Fresh Food Box en tu barrio (varios en Brooklyn) y recoge tu caja el día de distribución semanal.",
      linkLabel: "GrowNYC Fresh Food Box",
    },
    snap: {
      tagline:
        "Dinero mensual para el supermercado — y la llave que activa los Health Bucks.",
      whatYouGet:
        "Fondos mensuales en una tarjeta EBT para comida, incluyendo todas las frutas y verduras frescas que quieras. También es lo que activa los Health Bucks en el mercado.",
      whoQualifies:
        "Según el tamaño del hogar y los ingresos — muchas familias trabajadoras califican y no lo saben.",
      howToGet:
        "Solicita a través de ACCESS HRA, en línea, por teléfono o en persona.",
      linkLabel: "Solicita SNAP (ACCESS NYC)",
    },
    wic: {
      tagline:
        "Beneficios de frutas y verduras para embarazadas y niños pequeños.",
      whatYouGet:
        "Beneficios mensuales que incluyen un monto para frutas y verduras, además de apoyo nutricional y alimentos básicos saludables.",
      whoQualifies:
        "Personas embarazadas, posparto y lactantes, y niños menores de 5 años que cumplen las pautas de ingresos.",
      howToGet: "Solicita en un centro WIC de NYC cerca de ti.",
      linkLabel: "NYC WIC (oficial)",
    },
  },
  ht: {
    "health-bucks": {
      tagline:
        "$2 retounen pou chak $5 ou depanse ak SNAP nan mache fèmye yo.",
      whatYouGet:
        "Nan mache fèmye NYC yo, chak $5 ou depanse ak kat EBT ou ba ou yon koupon $2 Health Bucks pou achte plis fwi ak legim. Gwoup kominotè yo distribiye yo tou.",
      whoQualifies:
        "Nenpòt moun k ap achte ak SNAP/EBT nan yon mache ki patisipe — plis moun ki resevwa yo atravè òganizasyon kominotè.",
      howToGet:
        "Achte ak kat EBT ou nan yon mache fèmye NYC ki patisipe epi mande Health Bucks ou nan tab enfòmasyon mache a.",
      linkLabel: "NYC Health Bucks (ofisyèl)",
    },
    "pharmacy-to-farm": {
      tagline: "$30 pa mwa nan Health Bucks si ou gen tansyon wo + SNAP.",
      whatYouGet:
        "$30 nan Health Bucks chak mwa pou depanse sou fwi ak legim nan mache fèmye NYC yo — pou moun k ap jere tansyon wo.",
      whoQualifies:
        "Patisipan SNAP ki gen tansyon wo, ki enskri atravè yon famasi ki patisipe.",
      howToGet:
        "Mande famasyen ou si li patisipe nan pwogram Pharmacy to Farm la.",
      linkLabel: "Plis sou Health Bucks (NYC)",
      statusNote:
        "Finansman pwogram sa a chanje pandan ane yo — konfime ak famasyen ou ke li toujou ap mache anvan ou konte sou li.",
    },
    "hh-produce-box": {
      tagline: "Plizyè mwa bwat fwi ak legim gratis pou pasyan ki kalifye.",
      whatYouGet:
        "Pasyan ki kalifye resevwa bwat fwi ak legim gratis chak mwa pandan plizyè mwa, plis sipò pou manje plis legim — atravè Lifestyle Medicine Program la.",
      whoQualifies:
        "Pasyan nan sit NYC Health + Hospitals ki patisipe. Disponiblite depann de kote a.",
      howToGet:
        "Mande founisè NYC Health + Hospitals ou sou Lifestyle Medicine Program la.",
      linkLabel: "NYC Health + Hospitals",
      statusNote:
        "Mande founisè ou — ki sit ki patisipe ak kijan pou enskri ka chanje.",
    },
    "fresh-food-box": {
      tagline:
        "Bwat fwi ak legim fre pou pi bon mache, dirèkteman nan katye a.",
      whatYouGet:
        "Yon bwat fwi ak legim fre, sitou lokal, byen anba pri magazen. Li pran SNAP/EBT ak Health Bucks.",
      whoQualifies: "Ouvè pou tout moun — pa gen kondisyon revni.",
      howToGet:
        "Jwenn yon sit Fresh Food Box nan katye ou (plizyè nan Brooklyn) epi pran bwat ou jou distribisyon chak semèn nan.",
      linkLabel: "GrowNYC Fresh Food Box",
    },
    snap: {
      tagline:
        "Lajan chak mwa pou makèt — epi kle ki debloke Health Bucks yo.",
      whatYouGet:
        "Lajan chak mwa sou yon kat EBT pou manje, ki gen ladan tout fwi ak legim fre ou vle. Se li tou ki debloke Health Bucks nan mache a.",
      whoQualifies:
        "Baze sou gwosè fwaye a ak revni — anpil fanmi k ap travay kalifye epi yo pa konnen.",
      howToGet:
        "Aplike atravè ACCESS HRA, sou entènèt, pa telefòn, oswa an pèsòn.",
      linkLabel: "Aplike pou SNAP (ACCESS NYC)",
    },
    wic: {
      tagline: "Benefis fwi ak legim pou moun ansent ak timoun piti.",
      whatYouGet:
        "Benefis chak mwa ki gen yon montan pou fwi ak legim, plis sipò nitrisyon ak manje debaz ki bon pou sante.",
      whoQualifies:
        "Moun ansent, apre akouchman, ak k ap bay tete, ak timoun ki poko gen 5 an, ki satisfè direktiv revni yo.",
      howToGet: "Aplike nan yon sant WIC NYC toupre ou.",
      linkLabel: "NYC WIC (ofisyèl)",
    },
  },
};
