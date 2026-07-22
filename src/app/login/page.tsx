import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#fdf6ec] px-6 py-24">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" className="font-serif text-2xl text-[#4a3728]">
          Cartas de Amor
        </Link>
        <h1 className="text-lg text-[#4a3728]">Entra a tu cuenta</h1>
        <LoginForm callbackUrl={callbackUrl ?? "/dashboard"} />
      </div>
    </div>
  );
}
