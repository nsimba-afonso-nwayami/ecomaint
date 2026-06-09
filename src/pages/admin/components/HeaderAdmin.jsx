import { Link } from "react-router-dom";

export default function HeaderAdmin({
  sidebarOpen,
  setSidebarOpen,
  title,
}) {
  const actionBtnStyle =
    "relative w-10 h-10 cursor-pointer flex items-center justify-center rounded-xl bg-green-950 hover:bg-green-800 text-amber-300 transition-all duration-300 group";

  const badgeStyle =
    "absolute -top-1 -right-1 bg-amber-300 text-green-950 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black group-hover:scale-110 transition-transform";

  return (
    <header
      className="
        bg-green-900/95 backdrop-blur-sm text-white
        border-b border-green-950/50
        fixed top-0 right-0 left-0 md:left-64
        h-20 flex items-center justify-between
        px-6
        z-30 transition-all duration-300
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Menu Mobile */}
        <button
            className="md:hidden text-2xl text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
        >
            <i className="fa-solid fa-bars"></i>
        </button>

        {/* Voltar */}
        <button
            onClick={() => window.history.back()}
            className="
            w-10
            h-10
            cursor-pointer
            flex
            items-center
            justify-center
            rounded-xl
            bg-green-950
            text-amber-300
            hover:bg-green-800
            transition-all
            duration-300
            "
            title="Voltar"
        >
            <i className="fa-solid fa-arrow-left"></i>
        </button>

        <div className="hidden sm:block h-8 w-px bg-green-800"></div>

        <h2 className="text-lg font-black text-white tracking-tight">
            {title}
        </h2>
        </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notificações */}
        <Link
          to="/dashboard/admin/notificacoes"
          className={actionBtnStyle}
        >
          <i className="fa-solid fa-bell text-lg"></i>

          <span className={badgeStyle}>
            2
          </span>
        </Link>

        {/* Divider */}
        <div className="h-8 w-px bg-green-800 mx-1 hidden sm:block"></div>

        {/* Utilizador */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden lg:block">
            <p className="text-sm text-white font-bold leading-none">
              Administrador
            </p>

            <p className="text-[10px] text-amber-300 uppercase font-black tracking-widest mt-1">
              EcoMaint
            </p>
          </div>

          <Link
            to="/dashboard/admin/configuracoes"
            className="
              w-11 h-11
              cursor-pointer
              bg-amber-300
              text-green-950
              rounded-xl
              flex items-center justify-center
              hover:bg-amber-200
              transition-all duration-300
            "
          >
            <i className="fa-solid fa-user text-lg"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}
