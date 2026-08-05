import Link from "next/link";
import { BlogNav } from "@/components/blog/BlogNav";
import { signUp, signInWithGoogle } from "@/lib/enrollment/actions";

export const metadata = { title: "Sign up · Cybrum Solutions" };

const inputClass =
  "w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-md px-5 pb-24 pt-32 sm:px-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-3 text-sm text-muted">
          One account gets you into every Cybrum Solutions course.
        </p>

        <form action={signInWithGoogle} className="mt-8">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-surface/60 text-sm font-medium text-foreground transition-colors hover:border-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.74z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.4 7.4 0 0 1-11-3.9H1.06v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.07 14.2a7.2 7.2 0 0 1 0-4.4v-3.1H1.06a12 12 0 0 0 0 10.6z" />
              <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.06 6.7l4.01 3.1A7.16 7.16 0 0 1 12 4.75z" />
            </svg>
            Continue with Google
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>

        <form action={signUp} className="flex flex-col gap-4">
          <input type="text" name="name" required placeholder="Full name" className={inputClass} />
          <input type="email" name="email" required placeholder="Email address" className={inputClass} />
          <input
            type="password"
            name="password"
            required
            minLength={8}
            placeholder="Password (min 8 characters)"
            className={inputClass}
          />
          <input type="tel" name="phone" placeholder="WhatsApp / phone (optional)" className={inputClass} />

          {error === "exists" && (
            <p className="text-sm text-red-400">
              An account with that email already exists.{" "}
              <Link href="/login" className="underline">
                Log in instead
              </Link>
              .
            </p>
          )}
          {error === "validation" && (
            <p className="text-sm text-red-400">Please fill in every field (password: 8+ characters).</p>
          )}

          <button
            type="submit"
            className="btn-sheen mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_30px_-6px_var(--color-accent)]"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent-bright hover:underline">
            Log in
          </Link>
        </p>
      </main>
    </>
  );
}
