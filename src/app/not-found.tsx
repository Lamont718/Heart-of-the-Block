import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="container-block flex flex-col items-center py-20 text-center">
      <Logo className="h-14 w-14" />
      <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">
        This block doesn’t exist
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you’re looking for moved or never existed. Let’s get you back to
        something useful.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/directory" className="btn-secondary">
          Find healthy spots
        </Link>
        <Link href="/swaps" className="btn-secondary">
          Food Swap Finder
        </Link>
      </div>
    </div>
  );
}
