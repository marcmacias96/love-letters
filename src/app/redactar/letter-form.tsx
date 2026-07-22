"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createLetter, type LetterState } from "@/lib/actions/letters";
import { ShareButton } from "@/components/share-button";

const initialState: LetterState = {};

const THEMES = [
  { value: "classic", label: "Clásico" },
  { value: "rosa", label: "Rosa" },
  { value: "noche", label: "Noche" },
];

export function LetterForm() {
  const [state, action, pending] = useActionState(createLetter, initialState);

  if (state.slug) {
    const letterUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/carta/${state.slug}`;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center">
          <h2 className="font-serif text-2xl text-[#4a3728]">
            ¡Tu carta está lista!
          </h2>
          <p className="text-[#6b5645]">
            Compártela para que llegue a quien se la escribiste.
          </p>

          <p className="w-full truncate rounded-lg border border-[#e2d4c0] bg-[#fdf6ec] px-4 py-2 text-sm text-[#4a3728]">
            {letterUrl}
          </p>

          <ShareButton url={letterUrl} label="Compartir carta" />

          <div className="mt-2 flex flex-col gap-2 text-sm">
            <a
              href={`/carta/${state.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b5645] underline"
            >
              Ver cómo se verá
            </a>
            <a href="/redactar" className="text-[#6b5645] underline">
              Escribir otra carta
            </a>
            <Link href="/dashboard" className="text-[#6b5645] underline">
              Ir a mis cartas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="recipientName" className="text-sm text-[#6b5645]">
          Nombre del destinatario (opcional)
        </label>
        <input
          id="recipientName"
          name="recipientName"
          type="text"
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm text-[#6b5645]">
          Título (opcional)
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="theme" className="text-sm text-[#6b5645]">
          Tema
        </label>
        <select
          id="theme"
          name="theme"
          defaultValue="classic"
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        >
          {THEMES.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="text-sm text-[#6b5645]">
          Tu carta
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          placeholder="Querido/a..."
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-3 font-serif text-lg leading-relaxed text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-[#b3492f] px-8 py-3 text-white transition-opacity disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Crear carta"}
      </button>
    </form>
  );
}
