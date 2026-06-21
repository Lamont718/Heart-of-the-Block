import Link from "next/link";

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { reason?: string };
}) {
  const isConfirm = searchParams.reason === "confirm";
  return (
    <div className="container-block flex flex-col items-center py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold text-ink">
        {isConfirm ? "That link didn’t work" : "Something went sideways"}
      </h1>
      <p className="mt-3 max-w-md text-muted">
        {isConfirm
          ? "Your confirmation link may have expired or already been used. Try signing in, or create your account again."
          : "We hit a snag. Try again in a moment."}
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/login" className="btn-primary">
          Go to sign in
        </Link>
        <Link href="/" className="btn-secondary">
          Back home
        </Link>
      </div>
    </div>
  );
}
