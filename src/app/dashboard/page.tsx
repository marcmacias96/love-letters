import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutUser } from "@/lib/actions/auth";
import { ShareButton } from "@/components/share-button";

const STATUS_LABEL: Record<string, string> = {
  draft: "Borrador",
  sent: "Enviada",
  read: "Leída",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: letters } = await supabase
    .from("letters")
    .select("id, slug, title, recipient_name, status, created_at")
    .eq("author_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-1 flex-col items-center bg-[#fdf6ec] px-6 py-16">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-[#4a3728]">
            Cartas de Amor
          </Link>
          <form action={logoutUser}>
            <button type="submit" className="text-sm text-[#6b5645] underline">
              Cerrar sesión
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl text-[#4a3728]">Tus cartas</h1>
          <Link
            href="/redactar"
            className="rounded-full bg-[#b3492f] px-5 py-2 text-sm text-white"
          >
            Nueva carta
          </Link>
        </div>

        {!letters || letters.length === 0 ? (
          <p className="text-[#6b5645]">
            Todavía no has escrito ninguna carta.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {letters.map((letter) => (
              <li
                key={letter.id}
                className="flex items-center justify-between rounded-xl border border-[#e2d4c0] bg-white px-5 py-4"
              >
                <div>
                  <p className="font-serif text-lg text-[#4a3728]">
                    {letter.title || "Sin título"}
                  </p>
                  <p className="text-sm text-[#6b5645]">
                    Para {letter.recipient_name || "alguien especial"} ·{" "}
                    {STATUS_LABEL[letter.status] ?? letter.status}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <ShareButton
                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/carta/${letter.slug}`}
                  />
                  <Link
                    href={`/carta/${letter.slug}`}
                    className="text-sm text-[#b3492f] underline"
                  >
                    Ver
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
