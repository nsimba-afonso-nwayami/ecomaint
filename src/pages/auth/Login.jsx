import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/authValidation";
import {
  notifyError,
  notifyLoading,
  dismissToast,
} from "../../utils/notifications";
import { showSuccessAlert } from "../../utils/alerts";

export default function Login() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    const loadingToast = notifyLoading("A autenticar...");

    try {
      console.log("DADOS:", data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      dismissToast(loadingToast);

      await showSuccessAlert(
        "Login realizado!",
        "Bem-vindo ao EcoMaint."
      );

      navigate("/dashboard/admin");
    } catch (error) {
      dismissToast(loadingToast);

      notifyError("Não foi possível iniciar sessão.");
    }
  };

  return (
    <>
      <title>Entrar | EcoMaint</title>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-900 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <i className="fa-solid fa-screwdriver-wrench text-3xl text-amber-300"></i>
            </div>

            <h1 className="text-3xl font-black text-green-900">Entrar</h1>

            <p className="text-slate-500 mt-2">
              Acesse o sistema de gestão de manutenção.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-bold text-green-900">
                Email
              </label>

              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Digite o seu email"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 transition
                  ${
                    errors.email
                      ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border border-slate-300 focus:ring-green-900 focus:border-green-900"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block mb-2 text-sm font-bold text-green-900">
                Palavra-passe
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="Digite a sua palavra-passe"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 transition
                  ${
                    errors.password
                      ? "border border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border border-slate-300 focus:ring-green-900 focus:border-green-900"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Opções */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-green-900" />
                <span className="text-slate-600">Lembrar-me</span>
              </label>

              <Link
                to="/esqueci-senha"
                className="font-bold text-green-900 hover:text-green-700"
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                bg-amber-300
                hover:bg-amber-200
                disabled:opacity-70
                disabled:cursor-not-allowed
                text-green-950
                font-bold
                py-3
                rounded-xl
                transition-colors
                duration-300
                cursor-pointer
              "
            >
               {isSubmitting ? "A entrar..." : "Entrar no Sistema"}
            </button>
          </form>
        </div>

        {/* Rodapé */}
        <p className="text-center text-sm text-slate-500 mt-6">
          &copy; {new Date().getFullYear()} EcoMaint. Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
