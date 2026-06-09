import { Link } from "react-router-dom";

export default function VerificarEmail() {
  return (
    <>
      <title>Verificar Email | EcoMaint</title>

      <div className="w-full max-w-md">
        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
          {/* Cabeçalho */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-900 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <i className="fa-solid fa-envelope-circle-check text-3xl text-amber-300"></i>
            </div>

            <h1 className="text-3xl font-black text-green-900">
              Verifique o seu Email
            </h1>

            <p className="text-slate-500 mt-3 leading-relaxed">
              Enviámos um link de recuperação para o seu endereço de email.
              Verifique a sua caixa de entrada e siga as instruções para
              redefinir a sua palavra-passe.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              to="/login"
              className="
                w-full
                flex
                items-center
                justify-center
                bg-amber-300
                hover:bg-amber-200
                text-green-950
                font-bold
                py-3
                rounded-xl
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Voltar ao Login
            </Link>

            <button
              type="button"
              className="
                w-full
                border
                border-green-900
                text-green-900
                hover:bg-green-900
                hover:text-white
                font-bold
                py-3
                rounded-xl
                transition-colors
                duration-300
                cursor-pointer
              "
            >
              Reenviar Email
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          &copy; {new Date().getFullYear()} EcoMaint. Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
