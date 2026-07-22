import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#fdf6ec] px-6 py-24 text-center">
      <div className="flex max-w-lg flex-col items-center gap-6">
        <h1 className="font-serif text-4xl text-[#4a3728]">Cartas de Amor</h1>
        <p className="text-lg text-[#6b5645]">
          Antes de que todo se redujera a un WhatsApp, escribíamos cartas.
          Recupera ese ritual: escribe tu historia de amor y comparte el
          link con quien quieras.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/registro"
            className="rounded-full bg-[#b3492f] px-8 py-3 text-white"
          >
            Escribir mi carta
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-[#b3492f] px-8 py-3 text-[#b3492f]"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
