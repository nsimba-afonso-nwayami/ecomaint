import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <title>Página não encontrada | EcoMaint</title>

      <section className="min-h-screen bg-green-900 text-white flex items-center justify-center px-6 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-950 rounded-full -translate-x-40 -translate-y-40"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-950 rounded-full translate-x-48 translate-y-48"></div>

        <div className="relative z-10 max-w-xl text-center">
          {/* Ícone */}
          <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-amber-300 flex items-center justify-center">
            <i className="fa-solid fa-triangle-exclamation text-5xl text-green-950"></i>
          </div>

          {/* Código */}
          <h1 className="text-8xl font-black text-amber-300 mb-4">
            404
          </h1>

          {/* Título */}
          <h2 className="text-4xl font-black mb-4">
            Página não encontrada
          </h2>

          {/* Descrição */}
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            A página que procura não existe, foi removida ou o endereço
            introduzido está incorreto.
          </p>

          {/* Botão */}
          <Link
            to="/login"
            className="
              inline-flex
              items-center
              gap-3
              bg-amber-300
              hover:bg-amber-200
              text-green-950
              font-bold
              px-8
              py-4
              rounded-xl
              transition-colors
              duration-300
              cursor-pointer
            "
          >
            <i className="fa-solid fa-arrow-left"></i>
            Voltar ao Login
          </Link>

          <p className="mt-10 text-sm text-slate-400">
            &copy; {new Date().getFullYear()} EcoMaint. Todos os direitos reservados.
          </p>
        </div>
      </section>
    </>
  );
}