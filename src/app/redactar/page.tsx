import Link from "next/link";
import { LetterForm } from "./letter-form";

export default function RedactarPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-[#fdf6ec] px-6 py-16">
      <div className="flex w-full max-w-xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-[#4a3728]">
            Cartas de Amor
          </Link>
          <Link href="/dashboard" className="text-sm text-[#6b5645] underline">
            Mis cartas
          </Link>
        </div>

        <h1 className="font-serif text-2xl text-[#4a3728]">
          Escribe tu carta
        </h1>

        <LetterForm />
      </div>
    </div>
  );
}
