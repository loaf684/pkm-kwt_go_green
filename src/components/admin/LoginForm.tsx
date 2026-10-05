"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin/actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-[24px] border border-border bg-white p-6 shadow-sm sm:rounded-[28px] sm:p-8"
    >
      <img
                src="https://pkm-kwt-go-green.vercel.app/api/site-images/logo/image?v=1790353130"
                alt="Logo KWT"
                className="size-full object-cover"
              />
      <h1 className="text-xl font-extrabold">Masuk Admin</h1>
      <p className="mb-6 mt-1 text-sm text-muted">KWT Go Green Griya Asri — panel pengelolaan produk.</p>

      <input type="hidden" name="next" value={next} />

      <label htmlFor="password" className="mb-1.5 block text-sm font-bold">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        className="mb-2 w-full rounded-[10px] border border-border bg-bg px-3.5 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
      {state?.error && <p className="mb-3 text-sm font-semibold text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full rounded-full bg-primary py-3 font-bold text-white transition hover:bg-primary-600 disabled:opacity-70"
      >
        {pending ? "Memeriksa..." : "Masuk"}
      </button>
    </form>
  );
}
