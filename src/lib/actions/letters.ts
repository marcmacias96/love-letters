"use server";

import { nanoid } from "nanoid";
import { createClient } from "@/lib/supabase/server";

export type LetterState = {
  error?: string;
  slug?: string;
};

export async function createLetter(
  _prevState: LetterState,
  formData: FormData
): Promise<LetterState> {
  const title = String(formData.get("title") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const theme = String(formData.get("theme") ?? "classic");
  const recipientName = String(formData.get("recipientName") ?? "").trim() || null;

  if (!content) {
    return { error: "Escribe tu carta." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Tu sesión expiró, vuelve a iniciar sesión." };
  }

  const senderName = String(user.user_metadata?.name ?? user.email ?? "Alguien");
  const slug = nanoid(10);

  const { error: insertError } = await supabase.from("letters").insert({
    slug,
    title,
    content,
    theme,
    sender_name: senderName,
    recipient_name: recipientName,
    status: "sent",
    sent_at: new Date().toISOString(),
    author_id: user.id,
  });

  if (insertError) {
    return { error: "No se pudo guardar la carta. Intenta de nuevo." };
  }

  return { slug };
}
