import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#fdf6ec] px-6 py-24">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Link href="/" className="font-serif text-2xl text-[#4a3728]">
          Cartas de Amor
        </Link>
        <h1 className="text-lg text-[#4a3728]">Crea tu cuenta</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
