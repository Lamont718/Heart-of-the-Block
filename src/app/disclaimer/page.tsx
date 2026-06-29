import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Medical disclaimer",
  description:
    "Heart of the Block provides education, not medical advice or diagnosis.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="container-block max-w-2xl py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink">
        Medical disclaimer
      </h1>
      <div className="mt-6 space-y-5 text-ink">
        <p className="rounded-2xl bg-gold-100 p-5 text-base font-semibold">
          Heart of the Block provides education, not medical advice or
          diagnosis. It is not a substitute for professional medical care.
        </p>

        <Section title="What this is">
          A community tool to help you learn about heart health, make everyday
          food and movement choices, and find healthy places to shop in
          Brooklyn. The information here is general and educational.
        </Section>

        <Section title="What this is not">
          It is not a diagnosis, a treatment plan, or a replacement for your
          doctor. Our tools — including the heart-risk check and the barcode
          scanner — give you a picture to think about and discuss with a
          licensed provider, never a verdict about your health.
        </Section>

        <Section title="About your medications">
          Never start, stop, or change any medication based on anything you see
          on Heart of the Block. Talk to your prescriber first.
        </Section>

        <Section title="In an emergency">
          If you think you’re having a medical emergency — chest pain, trouble
          breathing, signs of a stroke — call <strong>911</strong> right away.
          Don’t wait, and don’t use this site instead.
        </Section>

        <Section title="Your health data">
          Anything you log is private to your account and protected with
          row-level security so only you can see it. We treat your health
          information as sensitive.
        </Section>

        <p className="text-muted">
          By using Heart of the Block you acknowledge and accept this
          disclaimer.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 leading-relaxed text-muted">{children}</p>
    </section>
  );
}
