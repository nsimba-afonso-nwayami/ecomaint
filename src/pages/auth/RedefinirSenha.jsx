import { Link } from "react-router-dom";

export default function RedefinirSenha() {
  return (
    <>
      <title>Redefinir Palavra-passe | EcoMaint</title>

      <div className="w-full max-w-md">
        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-900 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <i className="fa-solid fa-shield text-3xl text-amber-300"></i>
            </div>

            <h1 className="text-3xl font-black text-green-900">
              Nova Palavra-passe
            </h1>

            <p className="text-slate-500 mt-2">
              Defina uma nova palavra-passe para a sua conta.
            </p>
          </div>

          <form className="space-y-5">
            {/* Nova senha */}
            <div>
              <label className="block mb-2 text-sm font-bold text-green-900">
                Nova Palavra-passe
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                <input
                  type="password"
                  placeholder="Digite a nova palavra-passe"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-900
                    focus:border-green-900
                  "
                />
              </div>
            </div>

            {/* Confirmar senha */}
            <div>
              <label className="block mb-2 text-sm font-bold text-green-900">
                Confirmar Palavra-passe
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                <input
                  type="password"
                  placeholder="Confirme a nova palavra-passe"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-900
                    focus:border-green-900
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              className="
                w-full
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
              Atualizar Palavra-passe
            </button>

            <Link
              to="/login"
              className="
                flex
                items-center
                justify-center
                gap-2
                text-green-900
                font-bold
                hover:text-green-700
              "
            >
              <i className="fa-solid fa-arrow-left"></i>
              Voltar ao Login
            </Link>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          &copy; {new Date().getFullYear()} EcoMaint. Todos os direitos reservados.
        </p>
      </div>
    </>
  );
}
