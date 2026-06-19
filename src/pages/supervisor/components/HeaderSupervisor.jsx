import { Link } from "react-router-dom";

export default function HeaderSupervisor({ sidebarOpen, setSidebarOpen, title }) {
  // Botões de ação com hover refinado usando a paleta exata
  const actionBtnStyle =
    "relative w-10 h-10 cursor-pointer flex items-center justify-center rounded-xl bg-green-950/60 text-amber-300 hover:text-amber-200 hover:bg-green-800/80 border border-green-950/40 transition-all duration-300 group";

  // Badge de notificações com a cor de sombra do dourado (yellow-700) para dar profundidade
  const badgeStyle =
    "absolute -top-1 -right-1 bg-amber-300 text-green-950 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-sm shadow-yellow-700/40 group-hover:scale-110 transition-transform";

  return (
    <header
      className="
        bg-green-900/90 backdrop-blur-md text-slate-100
        border-b border-green-950/40
        fixed top-0 right-0 left-0 md:left-64
        h-20 flex items-center justify-between
        px-6
        z-30 transition-all duration-300
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Menu Mobile */}
        <button
          className="md:hidden text-2xl text-amber-300 hover:text-amber-200 transition-colors cursor-pointer p-1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Botão Voltar */}
        <button
          onClick={() => window.history.back()}
          className="
            w-10 h-10
            cursor-pointer
            flex items-center justify-center
            rounded-xl
            bg-green-950/60
            text-amber-300
            hover:text-amber-200
            hover:bg-green-800/80
            border border-green-950/40
            transition-all duration-300
          "
          title="Voltar"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>

        {/* Divisória usando o cinza esverdeado/sage (#9DA99C) */}
        <div className="hidden sm:block h-6 w-px bg-slate-400/20"></div>

        {/* Título da Página com Branco Gelo */}
        <h2 className="text-base font-extrabold text-slate-100 tracking-tight sm:text-lg">
          {title}
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notificações */}
        <Link
          to="/dashboard/supervisor/notificacoes"
          className={actionBtnStyle}
        >
          <i className="fa-solid fa-bell text-base"></i>
          <span className={badgeStyle}>2</span>
        </Link>

        {/* Divisória Central */}
        <div className="h-6 w-px bg-slate-400/20 mx-1 hidden sm:block"></div>

        {/* Bloco de Perfil do Utilizador */}
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-extrabold text-slate-100 leading-none tracking-wide">
              Administrador
            </p>
            <p className="text-[9px] text-slate-100 uppercase font-black tracking-[0.15em] mt-1 bg-green-950/40 py-0.5 px-2 rounded">
              EcoMaint
            </p>
          </div>

          {/* Avatar Premium usando Bege/Dourado e transição suave para Bege Claro */}
          <Link
            to="/dashboard/supervisor/configuracoes"
            className="
              w-10 h-10
              cursor-pointer
              bg-amber-300
              text-green-950
              rounded-xl
              flex items-center justify-center
              hover:bg-amber-200
              hover:scale-[1.02]
              shadow-md shadow-yellow-700/10
              transition-all duration-300
            "
          >
            <i className="fa-solid fa-user text-base"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}