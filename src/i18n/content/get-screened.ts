import type { Locale } from "../config";

/**
 * "Where to check your numbers" — completes the ABCs loop (know them → get them
 * checked → track them). Real resource TYPES + official citywide links only; we
 * do NOT invent specific clinic addresses. Spanish solid; Haitian Creole first
 * pass pending native review.
 */
export type GsResource = {
  emoji: string;
  title: string;
  body: string;
  link?: string;
  linkLabel?: string;
};
export type GsContent = {
  eyebrow: string;
  title: string;
  intro: string;
  resources: GsResource[];
  trackTitle: string;
  trackBody: string;
  trackButton: string;
  disclaimer: string;
  /** "Upcoming screenings & events" section. */
  events: {
    title: string;
    intro: string;
    empty: string;
    when: string;
    where: string;
    offered: string;
    cost: string;
    planned: string;
  };
};

const NYC_CARE = "https://www.nyccare.nyc/";
const HRSA = "https://findahealthcenter.hrsa.gov/";

const en: GsContent = {
  eyebrow: "Know your numbers",
  title: "Where to check your numbers — free or low-cost",
  intro:
    "Knowing your ABCs only helps if you can get them checked. Here are real places around the city to check your blood pressure, blood sugar, and cholesterol — many free, no insurance needed.",
  resources: [
    {
      emoji: "🏪",
      title: "Pharmacies",
      body: "Many pharmacies have a free blood-pressure machine you can use any time you stop in — CVS, Walgreens, Rite Aid, Duane Reade and more. The pharmacist can often check it for you and talk through your medications. No appointment, no cost.",
    },
    {
      emoji: "🏥",
      title: "NYC public hospitals & NYC Care",
      body: "NYC’s public hospitals see everyone — no matter your insurance or immigration status. NYC Care gives you low- or no-cost care and a regular doctor if you’re uninsured. A solid place to get your ABCs checked and keep them up.",
      link: NYC_CARE,
      linkLabel: "NYC Care",
    },
    {
      emoji: "🩺",
      title: "Community health centers",
      body: "Federally Qualified Health Centers (FQHCs) give full check-ups on a sliding scale — you pay based on what you can afford. There are several around Brooklyn.",
      link: HRSA,
      linkLabel: "Find a health center",
    },
    {
      emoji: "🎪",
      title: "Free screenings & health fairs",
      body: "Churches, libraries, block parties, and community groups host free screening days — blood pressure, sugar, cholesterol — often with someone right there to explain the numbers. Ask at your church, your community center, or around the block.",
    },
    {
      emoji: "🏠",
      title: "Check it at home",
      body: "A home blood-pressure monitor is cheap and easy. Sit and rest a few minutes first, feet flat, arm supported at heart level — then take the reading and write it down.",
    },
    {
      emoji: "⚠️",
      title: "When it’s an emergency",
      body: "Some numbers can’t wait. Chest pain, trouble speaking or seeing, a sudden severe headache, or very high blood pressure with symptoms — call 911. You don’t have to tough it out.",
    },
  ],
  trackTitle: "Got a number? Keep it.",
  trackBody:
    "Log your blood pressure, A1C, and cholesterol and watch the trends over time — then bring them to your doctor.",
  trackButton: "Open the tracker",
  disclaimer:
    "This points you to places to get screened — it isn’t medical care or a diagnosis. In an emergency, call 911.",
  events: {
    title: "Upcoming screenings & events near you",
    intro:
      "Free heart-health checks happening around the neighborhood. We add events here as they’re confirmed.",
    empty:
      "No events posted right now. Check the places above any time — and check back here as local screening days get added.",
    when: "When",
    where: "Where",
    offered: "What’s offered",
    cost: "Cost",
    planned: "Planned",
  },
};

const es: GsContent = {
  eyebrow: "Conoce tus números",
  title: "Dónde chequear tus números — gratis o a bajo costo",
  intro:
    "Conocer tus ABC solo ayuda si puedes medirlos. Aquí hay lugares reales en la ciudad para chequear tu presión, tu azúcar y tu colesterol — muchos gratis, sin necesidad de seguro.",
  resources: [
    {
      emoji: "🏪",
      title: "Farmacias",
      body: "Muchas farmacias tienen una máquina de presión gratis que puedes usar cuando pases — CVS, Walgreens, Rite Aid, Duane Reade y más. El farmacéutico muchas veces te la puede medir y repasar tus medicamentos. Sin cita, sin costo.",
    },
    {
      emoji: "🏥",
      title: "Hospitales públicos de NYC y NYC Care",
      body: "Los hospitales públicos de NYC atienden a todos — sin importar tu seguro ni tu estatus migratorio. NYC Care te da atención a bajo o ningún costo y un médico de cabecera si no tienes seguro. Un buen lugar para chequear tus ABC y mantenerlos.",
      link: NYC_CARE,
      linkLabel: "NYC Care",
    },
    {
      emoji: "🩺",
      title: "Centros de salud comunitarios",
      body: "Los Centros de Salud Calificados Federalmente (FQHC) dan chequeos completos en escala móvil — pagas según lo que puedas. Hay varios por Brooklyn.",
      link: HRSA,
      linkLabel: "Encuentra un centro de salud",
    },
    {
      emoji: "🎪",
      title: "Chequeos gratis y ferias de salud",
      body: "Iglesias, bibliotecas, fiestas de cuadra y grupos comunitarios organizan días de chequeo gratis — presión, azúcar, colesterol — muchas veces con alguien ahí mismo para explicarte los números. Pregunta en tu iglesia, tu centro comunitario o por la cuadra.",
    },
    {
      emoji: "🏠",
      title: "Chéquealo en casa",
      body: "Un monitor de presión para casa es barato y fácil. Primero siéntate y descansa unos minutos, pies en el piso, el brazo apoyado a la altura del corazón — luego toma la medida y anótala.",
    },
    {
      emoji: "⚠️",
      title: "Cuándo es una emergencia",
      body: "Algunos números no pueden esperar. Dolor de pecho, dificultad para hablar o ver, un dolor de cabeza fuerte y repentino, o presión muy alta con síntomas — llama al 911. No tienes que aguantarte.",
    },
  ],
  trackTitle: "¿Ya tienes un número? Guárdalo.",
  trackBody:
    "Registra tu presión, tu A1C y tu colesterol y observa las tendencias con el tiempo — luego llévalas a tu médico.",
  trackButton: "Abre el registro",
  disclaimer:
    "Esto te indica lugares donde chequearte — no es atención médica ni un diagnóstico. En una emergencia, llama al 911.",
  events: {
    title: "Chequeos y eventos cerca de ti",
    intro:
      "Chequeos de salud del corazón gratis en el vecindario. Agregamos eventos aquí a medida que se confirman.",
    empty:
      "No hay eventos publicados ahora. Visita los lugares de arriba cuando quieras — y vuelve aquí cuando se agreguen días de chequeo locales.",
    when: "Cuándo",
    where: "Dónde",
    offered: "Qué ofrecen",
    cost: "Costo",
    planned: "Planeado",
  },
};

const ht: GsContent = {
  eyebrow: "Konnen nimewo ou yo",
  title: "Kote pou tcheke nimewo ou yo — gratis oswa pou pi bon mache",
  intro:
    "Konnen ABC ou yo ede sèlman si ou ka fè yo tcheke. Men kote reyèl nan vil la pou tcheke tansyon ou, sik nan san ou, ak kolestewòl ou — anpil gratis, san ou pa bezwen asirans.",
  resources: [
    {
      emoji: "🏪",
      title: "Famasi",
      body: "Anpil famasi gen yon machin tansyon gratis ou ka itilize nenpòt lè ou pase — CVS, Walgreens, Rite Aid, Duane Reade ak lòt. Souvan famasyen an ka tcheke l pou ou epi pale sou medikaman ou yo. Pa gen randevou, pa gen frè.",
    },
    {
      emoji: "🏥",
      title: "Lopital piblik NYC ak NYC Care",
      body: "Lopital piblik NYC yo resevwa tout moun — kèlkeswa asirans ou oswa estati imigrasyon ou. NYC Care ba ou swen pou pi bon mache oswa gratis ak yon doktè regilye si ou pa gen asirans. Yon bon kote pou tcheke ABC ou yo epi kenbe yo.",
      link: NYC_CARE,
      linkLabel: "NYC Care",
    },
    {
      emoji: "🩺",
      title: "Sant sante kominotè",
      body: "Sant Sante Kalifye Federal (FQHC) bay egzamen konplè sou yon echèl k ap glise — ou peye selon sa ou kapab. Gen plizyè nan Brooklyn.",
      link: HRSA,
      linkLabel: "Jwenn yon sant sante",
    },
    {
      emoji: "🎪",
      title: "Tcheke gratis ak fwa sante",
      body: "Legliz, bibliyotèk, fèt blòk, ak gwoup kominotè òganize jou tcheke gratis — tansyon, sik, kolestewòl — souvan ak yon moun la menm pou esplike nimewo yo. Mande nan legliz ou, sant kominotè ou, oswa nan blòk la.",
    },
    {
      emoji: "🏠",
      title: "Tcheke l lakay",
      body: "Yon monitè tansyon pou lakay bon mache epi fasil. Chita epi repoze kèk minit anvan, pye plat atè, bra a sipòte nan nivo kè a — answit pran mezi a epi ekri l.",
    },
    {
      emoji: "⚠️",
      title: "Lè se yon ijans",
      body: "Kèk nimewo pa ka tann. Doulè nan pwatrin, difikilte pou pale oswa wè, yon gwo tèt fè mal sibit, oswa tansyon ki wo anpil ak sentòm — rele 911. Ou pa oblije sipòte l.",
    },
  ],
  trackTitle: "Ou gen yon nimewo? Kenbe l.",
  trackBody:
    "Anrejistre tansyon ou, A1C ou, ak kolestewòl ou epi gade tandans yo avèk tan — answit pote yo bay doktè ou.",
  trackButton: "Louvri zouti swivi a",
  disclaimer:
    "Sa a montre ou kote pou fè tcheke — se pa swen medikal ni yon dyagnostik. Nan yon ijans, rele 911.",
  events: {
    title: "Tcheke ak evènman toupre ou",
    intro:
      "Tcheke sante kè gratis k ap fèt nan katye a. Nou ajoute evènman isit la lè yo konfime yo.",
    empty:
      "Pa gen evènman pou kounye a. Ale nan kote ki anlè yo nenpòt lè — epi tounen isit la lè jou tcheke lokal yo ajoute.",
    when: "Kilè",
    where: "Kote",
    offered: "Sa yo ofri",
    cost: "Pri",
    planned: "Planifye",
  },
};

export const GET_SCREENED: Record<Locale, GsContent> = { en, es, ht };
