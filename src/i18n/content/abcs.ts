import type { Locale } from "../config";

/**
 * Translated content for the ABCs of Life page. Spanish is a solid translation;
 * Haitian Creole is a FIRST PASS pending native review (see
 * docs/TRANSLATIONS-REVIEW.md). Numeric ranges (5.7%, 120/80) are kept as-is.
 */
export type ABCRow = { label: string; range: string; tone: "good" | "okay" | "limit" };
export type ABCCard = {
  letter: string;
  name: string;
  what: string;
  rows: ABCRow[];
  note: string;
  trackLabel: string;
  trackHref: string;
  readLabel: string;
  readHref: string;
};
export type ABCContent = {
  eyebrow: string;
  title: string;
  intro: string;
  creditBefore: string;
  creditEmph: string;
  creditAfter: string;
  cards: [ABCCard, ABCCard, ABCCard];
  disclaimerBefore: string;
  disclaimerEmph: string;
  disclaimerAfter: string;
  whereToCheck: string;
};

const en: ABCContent = {
  eyebrow: "Know your numbers",
  title: "The ABCs of Life",
  intro:
    "Three numbers worth knowing for your heart — and the good news is they’re all things you can get ahead of. Learn what they mean, then track yours and bring them to your doctor.",
  creditBefore:
    "The “ABCs of Life” came straight from the block — a Father’s Day conversation on the Your Opinion Doesn’t Matter podcast with two Brooklyn neighbors who work in health care: a physical therapist and a nurse practitioner. Their message was simple: ",
  creditEmph: "know your numbers, and get ahead of them.",
  creditAfter: " This whole platform grew out of that talk.",
  cards: [
    {
      letter: "A",
      name: "A1C — your blood sugar",
      what: "A single number that reflects your average blood sugar over about the last 3 months. One meal won’t spike it — it’s the long view.",
      rows: [
        { label: "Normal", range: "under 5.7%", tone: "good" },
        { label: "Prediabetes", range: "5.7% – 6.4%", tone: "okay" },
        { label: "Diabetes range", range: "6.5% and up", tone: "limit" },
      ],
      note: "High blood sugar over time quietly damages blood vessels, which is hard on your heart — so knowing this number early matters.",
      trackLabel: "Track your A1C",
      trackHref: "/tracker",
      readLabel: "Diabetes & your heart",
      readHref: "/learn/diabetes-and-your-heart",
    },
    {
      letter: "B",
      name: "Blood pressure",
      what: "The force of your blood pushing against your artery walls — written as two numbers, like 120/80 (the top when your heart beats, the bottom when it rests).",
      rows: [
        { label: "Normal", range: "under 120 / 80", tone: "good" },
        { label: "Elevated", range: "120–129 / under 80", tone: "okay" },
        { label: "High (stage 1)", range: "130–139 / 80–89", tone: "limit" },
        { label: "High (stage 2)", range: "140+ / 90+", tone: "limit" },
      ],
      note: "It usually has no symptoms — which is exactly why it’s worth measuring. The American Heart Association puts the target under 120/80.",
      trackLabel: "Track your blood pressure",
      trackHref: "/tracker",
      readLabel: "Blood pressure: the quiet one",
      readHref: "/learn/blood-pressure-the-quiet-one",
    },
    {
      letter: "C",
      name: "Cholesterol",
      what: "A few numbers, really: LDL (the “bad” kind that builds up), HDL (the “good” kind that clears it out), and your total.",
      rows: [
        { label: "Total — desirable", range: "under 200", tone: "good" },
        { label: "LDL (“bad”)", range: "lower is better", tone: "okay" },
        { label: "HDL (“good”)", range: "higher is better", tone: "good" },
      ],
      note: "Fiber, better fats (like the omega-3s in salmon), and moving your body all help — see the Learn section for everyday food moves.",
      trackLabel: "Track your cholesterol",
      trackHref: "/tracker",
      readLabel: "Cholesterol, plain and simple",
      readHref: "/learn/cholesterol-plain-and-simple",
    },
  ],
  disclaimerBefore: "These ranges are ",
  disclaimerEmph: "general guideposts",
  disclaimerAfter:
    " (the kind the American Heart Association uses), not a diagnosis. Your numbers belong in a conversation with your doctor, who sees your whole picture. In an emergency, call ",
  whereToCheck: "Where to get these checked — free & low-cost →",
};

// --- Spanish ---
const es: ABCContent = {
  eyebrow: "Conoce tus números",
  title: "Los ABC de la vida",
  intro:
    "Tres números que vale la pena conocer para tu corazón — y la buena noticia es que puedes adelantarte a todos ellos. Aprende qué significan, luego registra los tuyos y llévalos a tu médico.",
  creditBefore:
    "Los “ABC de la vida” vienen directo del barrio — una conversación del Día del Padre en el podcast Your Opinion Doesn’t Matter con dos vecinos de Brooklyn que trabajan en el cuidado de la salud: un fisioterapeuta y una enfermera practicante. Su mensaje fue sencillo: ",
  creditEmph: "conoce tus números y adelántate a ellos.",
  creditAfter: " Toda esta plataforma nació de esa conversación.",
  cards: [
    {
      letter: "A",
      name: "A1C — tu azúcar en sangre",
      what: "Un solo número que refleja tu nivel promedio de azúcar en sangre durante los últimos 3 meses aproximadamente. Una comida no lo dispara — es la mirada a largo plazo.",
      rows: [
        { label: "Normal", range: "menos de 5.7%", tone: "good" },
        { label: "Prediabetes", range: "5.7% – 6.4%", tone: "okay" },
        { label: "Rango de diabetes", range: "6.5% o más", tone: "limit" },
      ],
      note: "El azúcar alta con el tiempo daña en silencio los vasos sanguíneos, lo cual es duro para tu corazón — por eso importa conocer este número temprano.",
      trackLabel: "Registra tu A1C",
      trackHref: "/tracker",
      readLabel: "La diabetes y tu corazón",
      readHref: "/learn/diabetes-and-your-heart",
    },
    {
      letter: "B",
      name: "Presión arterial",
      what: "La fuerza de tu sangre empujando contra las paredes de las arterias — se escribe como dos números, como 120/80 (el de arriba cuando el corazón late, el de abajo cuando descansa).",
      rows: [
        { label: "Normal", range: "menos de 120 / 80", tone: "good" },
        { label: "Elevada", range: "120–129 / menos de 80", tone: "okay" },
        { label: "Alta (etapa 1)", range: "130–139 / 80–89", tone: "limit" },
        { label: "Alta (etapa 2)", range: "140+ / 90+", tone: "limit" },
      ],
      note: "Por lo general no tiene síntomas — y por eso justamente vale la pena medirla. La Asociación Americana del Corazón pone la meta en menos de 120/80.",
      trackLabel: "Registra tu presión arterial",
      trackHref: "/tracker",
      readLabel: "La presión arterial: la silenciosa",
      readHref: "/learn/blood-pressure-the-quiet-one",
    },
    {
      letter: "C",
      name: "Colesterol",
      what: "En realidad son varios números: LDL (el “malo” que se acumula), HDL (el “bueno” que lo limpia) y tu total.",
      rows: [
        { label: "Total — deseable", range: "menos de 200", tone: "good" },
        { label: "LDL (“malo”)", range: "más bajo es mejor", tone: "okay" },
        { label: "HDL (“bueno”)", range: "más alto es mejor", tone: "good" },
      ],
      note: "La fibra, las grasas buenas (como los omega-3 del salmón) y mover el cuerpo ayudan — mira la sección Aprende para cambios diarios en la comida.",
      trackLabel: "Registra tu colesterol",
      trackHref: "/tracker",
      readLabel: "El colesterol, claro y sencillo",
      readHref: "/learn/cholesterol-plain-and-simple",
    },
  ],
  disclaimerBefore: "Estos rangos son ",
  disclaimerEmph: "guías generales",
  disclaimerAfter:
    " (del tipo que usa la Asociación Americana del Corazón), no un diagnóstico. Tus números pertenecen a una conversación con tu médico, que ve tu panorama completo. En una emergencia, llama al ",
  whereToCheck: "Dónde chequear esto — gratis y a bajo costo →",
};

// --- Haitian Creole (FIRST PASS — needs native review) ---
const ht: ABCContent = {
  eyebrow: "Konnen nimewo ou yo",
  title: "ABC Lavi a",
  intro:
    "Twa nimewo ki enpòtan pou kè ou — epi bon nouvèl la se ke ou ka pran devan yo tout. Aprann sa yo vle di, answit anrejistre pa ou yo epi pote yo bay doktè ou.",
  creditBefore:
    "« ABC Lavi a » soti dirèkteman nan katye a — yon konvèsasyon Jou Papa sou podcast Your Opinion Doesn’t Matter ak de vwazen Brooklyn ki travay nan swen sante: yon fizyoterapèt ak yon enfimyè pratik. Mesaj yo te senp: ",
  creditEmph: "konnen nimewo ou yo, epi pran devan yo.",
  creditAfter: " Tout platfòm sa a soti nan konvèsasyon sa a.",
  cards: [
    {
      letter: "A",
      name: "A1C — sik nan san ou",
      what: "Yon sèl nimewo ki montre mwayèn sik nan san ou pandan apeprè 3 dènye mwa yo. Yon sèl repa pa fè l monte — se gade alontèm.",
      rows: [
        { label: "Nòmal", range: "mwens pase 5.7%", tone: "good" },
        { label: "Pre-dyabèt", range: "5.7% – 6.4%", tone: "okay" },
        { label: "Nivo dyabèt", range: "6.5% oswa plis", tone: "limit" },
      ],
      note: "Sik wo nan san pandan tan an ap andomaje veso san yo an silans, sa ki di pou kè ou — se poutèt sa li enpòtan pou konnen nimewo sa a bonè.",
      trackLabel: "Swiv A1C ou",
      trackHref: "/tracker",
      readLabel: "Dyabèt ak kè ou",
      readHref: "/learn/diabetes-and-your-heart",
    },
    {
      letter: "B",
      name: "Tansyon",
      what: "Fòs san ou k ap pouse kont mi atè ou yo — yo ekri l kòm de nimewo, tankou 120/80 (anwo a lè kè a bat, anba a lè l repoze).",
      rows: [
        { label: "Nòmal", range: "mwens pase 120 / 80", tone: "good" },
        { label: "Elve", range: "120–129 / mwens pase 80", tone: "okay" },
        { label: "Wo (etap 1)", range: "130–139 / 80–89", tone: "limit" },
        { label: "Wo (etap 2)", range: "140+ / 90+", tone: "limit" },
      ],
      note: "Anjeneral li pa gen sentòm — se egzakteman poukisa li enpòtan pou mezire l. American Heart Association mete objektif la anba 120/80.",
      trackLabel: "Swiv tansyon ou",
      trackHref: "/tracker",
      readLabel: "Tansyon: sila ki an silans la",
      readHref: "/learn/blood-pressure-the-quiet-one",
    },
    {
      letter: "C",
      name: "Kolestewòl",
      what: "An reyalite se kèk nimewo: LDL (move kalite a ki ranmase), HDL (bon kalite a ki netwaye l), ak total ou.",
      rows: [
        { label: "Total — dezirab", range: "mwens pase 200", tone: "good" },
        { label: "LDL (move)", range: "pi ba pi bon", tone: "okay" },
        { label: "HDL (bon)", range: "pi wo pi bon", tone: "good" },
      ],
      note: "Fib, pi bon grès (tankou omega-3 nan somon), ak deplase kò ou tout ede — gade seksyon Aprann pou chanjman manje chak jou.",
      trackLabel: "Swiv kolestewòl ou",
      trackHref: "/tracker",
      readLabel: "Kolestewòl, klè e senp",
      readHref: "/learn/cholesterol-plain-and-simple",
    },
  ],
  disclaimerBefore: "Ranje sa yo se ",
  disclaimerEmph: "gid jeneral",
  disclaimerAfter:
    " (kalite American Heart Association itilize), se pa yon dyagnostik. Nimewo ou yo dwe nan yon konvèsasyon ak doktè ou, ki wè tout pòtre ou. Nan yon ijans, rele ",
  whereToCheck: "Kote pou fè tcheke sa yo — gratis & pi bon mache →",
};

export const ABC_CONTENT: Record<Locale, ABCContent> = { en, es, ht };
