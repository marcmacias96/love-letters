"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser, type AuthState } from "@/lib/actions/auth";

const initialState: AuthState = {};

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerUser, initialState);

  if (state.message) {
    return <p className="text-center text-[#4a3728]">{state.message}</p>;
  }

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-[#6b5645]">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-[#6b5645]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-[#6b5645]">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="rounded-lg border border-[#e2d4c0] bg-white px-4 py-2 text-[#4a3728] outline-none focus:border-[#b3492f]"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-[#b3492f] px-6 py-2 text-white transition-opacity disabled:opacity-60"
      >
        {pending ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-[#6b5645]">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="underline">
          Entra
        </Link>
      </p>
    </form>
  );
}
