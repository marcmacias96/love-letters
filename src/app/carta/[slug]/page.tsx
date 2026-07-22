import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const THEME_STYLES: Record<string, { page: string; card: string; text: string }> = {
  classic: {
    page: "bg-[#fdf6ec]",
    card: "bg-white border border-[#e2d4c0]",
    text: "text-[#4a3728]",
  },
  rosa: {
    page: "bg-[#fdf1f4]",
    card: "bg-white border border-[#f3d2de]",
    text: "text-[#7a2f45]",
  },
  noche: {
    page: "bg-[#1b1b2f]",
    card: "bg-[#262640] border border-[#3a3a5c]",
    text: "text-[#f1eefb]",
  },
};

export default async function CartaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: letter } = await supabase
    .from("letters")
    .select("title, content, sender_name, recipient_name, theme, status")
    .eq("slug", slug)
    .in("status", ["sent", "read"])
    .single();

  if (!letter) {
    notFound();
  }

  const style = THEME_STYLES[letter.theme] ?? THEME_STYLES.classic;
  const greeting = letter.recipient_name
    ? `Querido/a ${letter.recipient_name},`
    : "Querido/a,";

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center px-6 py-16 ${style.page}`}
    >
      <div
        className={`w-full max-w-xl rounded-2xl px-8 py-10 shadow-sm ${style.card}`}
      >
        {letter.title && (
          <h1 className={`mb-6 font-serif text-2xl ${style.text}`}>
            {letter.title}
          </h1>
        )}
        <p className={`mb-4 font-serif text-lg ${style.text}`}>{greeting}</p>
        <p className={`whitespace-pre-wrap font-serif text-lg leading-relaxed ${style.text}`}>
          {letter.content}
        </p>
        <p className={`mt-8 font-serif text-lg ${style.text}`}>
          — {letter.sender_name}
        </p>
      </div>
    </div>
  );
}
