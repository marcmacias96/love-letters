"use client";

import { useState } from "react";

export function ShareButton({
  url,
  label = "Compartir",
}: {
  url: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function handleClick() {
    if (canNativeShare) {
      try {
        await navigator.share({ url });
      } catch {
        // user cancelled the native share sheet
      }
      return;
    }
    setOpen((value) => !value);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }

  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        className="text-sm text-[#b3492f] underline"
      >
        {copied ? "¡Copiado!" : label}
      </button>

      {open && !canNativeShare && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-[#e2d4c0] bg-white p-1 text-left shadow-lg">
            <button
              type="button"
              onClick={copyLink}
              className="block w-full rounded px-3 py-2 text-left text-sm text-[#4a3728] hover:bg-[#fdf6ec]"
            >
              Copiar link
            </button>
            <a
              href={`https://wa.me/?text=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded px-3 py-2 text-sm text-[#4a3728] hover:bg-[#fdf6ec]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:?body=${encodedUrl}`}
              className="block rounded px-3 py-2 text-sm text-[#4a3728] hover:bg-[#fdf6ec]"
            >
              Email
            </a>
          </div>
        </>
      )}
    </div>
  );
}
