/**
 * Money for Produce — real NYC programs that help people afford fruits and
 * vegetables (food-as-medicine / produce incentives). Surfacing these locally is
 * Heart of the Block's sharpest differentiator: the programs exist, but no
 * consumer app puts them in front of the neighborhood.
 *
 * ACCURACY RULE (CONTEXT.md): benefit programs, amounts, and eligibility change,
 * and we do NOT invent them. Every program links to its official source, and any
 * program whose current status we can't confirm is flagged status: "verify" with
 * a note. Keep PROGRAMS_LAST_CHECKED honest.
 *
 * >>> VERIFY BEFORE TREATING AS GOSPEL (for Lamont / the team):
 *   - Pharmacy to Farm: original pilot funding ran 2017–2020 — confirm it's
 *     currently operating and the $30/mo figure before promoting it.
 *   - NYC H+H Lifestyle Medicine produce boxes: confirm which sites participate
 *     and the current enrollment path; update the link to the exact program page.
 *   - Re-check every official link still resolves, and Health Bucks match terms.
 */

export const PROGRAMS_LAST_CHECKED = "June 2026";

export type ProgramStatus = "active" | "verify";

export type Program = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  whatYouGet: string;
  whoQualifies: string;
  howToGet: string;
  link: string;
  linkLabel: string;
  status: ProgramStatus;
  statusNote?: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "health-bucks",
    name: "Health Bucks",
    emoji: "🎟️",
    tagline: "$2 back for every $5 you spend with SNAP at farmers markets.",
    whatYouGet:
      "At NYC farmers markets, every $5 you spend with your EBT card earns a $2 Health Bucks coupon to buy more fruits and vegetables. Community groups hand them out too.",
    whoQualifies:
      "Anyone shopping with SNAP/EBT at a participating market — plus people who receive them through community organizations.",
    howToGet:
      "Shop with your EBT card at a participating NYC farmers market and ask for your Health Bucks at the market’s info table.",
    link: "https://www.nyc.gov/site/doh/health/health-topics/health-bucks.page",
    linkLabel: "NYC Health Bucks (official)",
    status: "active",
  },
  {
    id: "pharmacy-to-farm",
    name: "Pharmacy to Farm",
    emoji: "💊",
    tagline: "$30 a month in Health Bucks if you have high blood pressure + SNAP.",
    whatYouGet:
      "$30 in Health Bucks each month to spend on produce at NYC farmers markets — aimed at folks managing high blood pressure.",
    whoQualifies:
      "SNAP participants with high blood pressure, enrolled through a participating pharmacy.",
    howToGet:
      "Ask your pharmacist whether they take part in the Pharmacy to Farm program.",
    link: "https://www.nyc.gov/site/doh/health/health-topics/health-bucks.page",
    linkLabel: "More on Health Bucks (NYC)",
    status: "verify",
    statusNote:
      "This program’s funding has shifted over the years — confirm it’s currently running with your pharmacist before counting on it.",
  },
  {
    id: "hh-produce-box",
    name: "Free produce boxes (NYC Health + Hospitals)",
    emoji: "📦",
    tagline: "Months of free produce boxes for eligible patients.",
    whatYouGet:
      "Eligible patients get free monthly produce boxes for a stretch of months, plus support for eating more plants — through the Lifestyle Medicine Program.",
    whoQualifies:
      "Patients at participating NYC Health + Hospitals sites. Availability is by location.",
    howToGet:
      "Ask your NYC Health + Hospitals provider about the Lifestyle Medicine Program.",
    link: "https://www.nychealthandhospitals.org/",
    linkLabel: "NYC Health + Hospitals",
    status: "verify",
    statusNote:
      "Ask your provider — which sites participate and how to enroll can change.",
  },
  {
    id: "fresh-food-box",
    name: "GrowNYC Fresh Food Box",
    emoji: "🧺",
    tagline: "Low-cost boxes of fresh produce, right in the neighborhood.",
    whatYouGet:
      "A box of fresh, mostly-local fruits and vegetables for well below store prices. Takes SNAP/EBT and Health Bucks.",
    whoQualifies: "Open to everyone — no income requirement.",
    howToGet:
      "Find a neighborhood Fresh Food Box site (several in Brooklyn) and pick up your box on the weekly distribution day.",
    link: "https://www.grownyc.org/foodbox",
    linkLabel: "GrowNYC Fresh Food Box",
    status: "active",
  },
  {
    id: "snap",
    name: "SNAP (food stamps)",
    emoji: "🛒",
    tagline: "Monthly money for groceries — and the key that unlocks Health Bucks.",
    whatYouGet:
      "Monthly funds on an EBT card for food, including all the fresh produce you want. It’s also what unlocks Health Bucks at the market.",
    whoQualifies:
      "Based on household size and income — many working families qualify and don’t realize it.",
    howToGet: "Apply through ACCESS HRA, online, by phone, or in person.",
    link: "https://access.nyc.gov/programs/supplemental-nutrition-assistance-program-snap/",
    linkLabel: "Apply for SNAP (ACCESS NYC)",
    status: "active",
  },
  {
    id: "wic",
    name: "WIC",
    emoji: "🍎",
    tagline: "Fruit & veggie benefits for pregnant people and young children.",
    whatYouGet:
      "Monthly benefits that include a fruit-and-vegetable amount, plus nutrition support and healthy staples.",
    whoQualifies:
      "Pregnant, postpartum, and breastfeeding people, and children under 5, who meet the income guidelines.",
    howToGet: "Apply through a NYC WIC center near you.",
    link: "https://www.nyc.gov/site/doh/health/health-topics/wic.page",
    linkLabel: "NYC WIC (official)",
    status: "active",
  },
];
