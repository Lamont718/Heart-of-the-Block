import type { Locale } from "./config";

/**
 * UI-shell translations (navigation, buttons, footer). FIRST-PASS for Spanish
 * and Haitian Creole — see docs/TRANSLATIONS-REVIEW.md. A native speaker should
 * review these before we lean on them. Health CONTENT (articles, recipes, the
 * ABCs ranges, medical disclaimers) is deliberately NOT machine-translated here;
 * it stays English until reviewed, and a localized notice tells visitors so.
 */
export type Dict = {
  nav: {
    abcs: string;
    shop: string;
    healthyBuys: string;
    eatForLess: string;
    plans: string;
    learn: string;
    community: string;
    tools: string;
  };
  auth: { signIn: string; getStarted: string; myAccount: string; signOut: string };
  menu: { open: string; close: string };
  footer: {
    tagline: string;
    toolsTitle: string;
    exploreTitle: string;
    aboutTitle: string;
    swaps: string;
    scanner: string;
    tracker: string;
    heartRisk: string;
    guidedPlans: string;
    getScreened: string;
    disclaimerLink: string;
    privacy: string;
    copyright: string;
    emergencyPre: string;
  };
  switcher: { label: string };
  notice: string;
};

const en: Dict = {
  nav: {
    abcs: "The ABCs",
    shop: "Where to shop",
    healthyBuys: "Healthy buys",
    eatForLess: "Eat for less",
    plans: "Plans",
    learn: "Learn",
    community: "Community",
    tools: "Tools",
  },
  auth: {
    signIn: "Sign in",
    getStarted: "Get started",
    myAccount: "My account",
    signOut: "Sign out",
  },
  menu: { open: "Open menu", close: "Close menu" },
  footer: {
    tagline:
      "Brooklyn heart health, the way you live. Made of the community, not outside it.",
    toolsTitle: "The tools",
    exploreTitle: "Explore",
    aboutTitle: "About",
    swaps: "Food Swap Finder",
    scanner: "Barcode Scanner",
    tracker: "Numbers Tracker",
    heartRisk: "Heart-risk check",
    guidedPlans: "Guided plans",
    getScreened: "Get screened",
    disclaimerLink: "Medical disclaimer",
    privacy: "Privacy",
    copyright: "Heart of the Block. A Brooklyn community project.",
    emergencyPre: "If this is an emergency, call",
  },
  switcher: { label: "Choose language" },
  notice:
    "Some pages are still in English while we add more languages. We’re working on it.",
};

// --- Spanish (first pass — pending native review) ---
const es: Dict = {
  nav: {
    abcs: "Los ABC",
    shop: "Dónde comprar",
    healthyBuys: "Compras saludables",
    eatForLess: "Come por menos",
    plans: "Planes",
    learn: "Aprende",
    community: "Comunidad",
    tools: "Herramientas",
  },
  auth: {
    signIn: "Iniciar sesión",
    getStarted: "Empezar",
    myAccount: "Mi cuenta",
    signOut: "Cerrar sesión",
  },
  menu: { open: "Abrir menú", close: "Cerrar menú" },
  footer: {
    tagline:
      "Salud del corazón en Brooklyn, a tu manera. Hecho por la comunidad, no desde afuera.",
    toolsTitle: "Las herramientas",
    exploreTitle: "Explora",
    aboutTitle: "Acerca de",
    swaps: "Buscador de sustituciones",
    scanner: "Escáner de código de barras",
    tracker: "Registro de números",
    heartRisk: "Chequeo de riesgo cardíaco",
    guidedPlans: "Planes guiados",
    getScreened: "Hazte un chequeo",
    disclaimerLink: "Aviso médico",
    privacy: "Privacidad",
    copyright: "Heart of the Block. Un proyecto comunitario de Brooklyn.",
    emergencyPre: "Si es una emergencia, llama al",
  },
  switcher: { label: "Elegir idioma" },
  notice:
    "Algunas páginas todavía están en inglés mientras agregamos más idiomas. Estamos trabajando en ello.",
};

// --- Haitian Creole (first pass — NEEDS native review before relying on it) ---
const ht: Dict = {
  nav: {
    abcs: "ABC yo",
    shop: "Kote pou achte",
    healthyBuys: "Acha ki bon pou sante",
    eatForLess: "Manje pou mwens",
    plans: "Plan yo",
    learn: "Aprann",
    community: "Kominote",
    tools: "Zouti",
  },
  auth: {
    signIn: "Konekte",
    getStarted: "Kòmanse",
    myAccount: "Kont mwen",
    signOut: "Dekonekte",
  },
  menu: { open: "Louvri meni", close: "Fèmen meni" },
  footer: {
    tagline:
      "Sante kè nan Brooklyn, jan ou viv la. Fèt pa kominote a, pa deyò l.",
    toolsTitle: "Zouti yo",
    exploreTitle: "Eksplore",
    aboutTitle: "Konsènan",
    swaps: "Jwenn ranplasman manje",
    scanner: "Eskanè kòd ba",
    tracker: "Swiv nimewo ou yo",
    heartRisk: "Tcheke risk kè",
    guidedPlans: "Plan ki gen gid",
    getScreened: "Fè tcheke",
    disclaimerLink: "Avètisman medikal",
    privacy: "Konfidansyalite",
    copyright: "Heart of the Block. Yon pwojè kominote Brooklyn.",
    emergencyPre: "Si se yon ijans, rele",
  },
  switcher: { label: "Chwazi lang" },
  notice:
    "Kèk paj toujou an angle pandan n ap ajoute plis lang. N ap travay sou li.",
};

export const dictionaries: Record<Locale, Dict> = { en, es, ht };
