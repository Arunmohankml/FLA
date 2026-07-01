import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Go Home
      </Link>
    </div>
  );
}
