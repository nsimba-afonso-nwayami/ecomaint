import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin({
  sidebarOpen,
  setSidebarOpen,
}) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      label: "Dashboard",
      icon: "fa-gauge-high",
      path: "/dashboard/admin",
    },
    {
      label: "Equipamentos",
      icon: "fa-gears",
      path: "/dashboard/admin/equipamentos",
    },
    {
      label: "Manutenções",
      icon: "fa-screwdriver-wrench",
      path: "/dashboard/admin/manutencoes",
    },
    {
      label: "Ocorrências",
      icon: "fa-triangle-exclamation",
      path: "/dashboard/admin/ocorrencias",
    },
    {
      label: "Stock",
      icon: "fa-boxes-stacked",
      path: "/dashboard/admin/stock",
    },
    {
      label: "Relatórios",
      icon: "fa-file-lines",
      path: "/dashboard/admin/relatorios",
    },
    {
      label: "Indicadores",
      icon: "fa-chart-line",
      path: "/dashboard/admin/indicadores",
    },
    {
      label: "Utilizadores",
      icon: "fa-users",
      path: "/dashboard/admin/utilizadores",
    },
    {
      label: "Configurações",
      icon: "fa-gear",
      path: "/dashboard/admin/configuracoes",
    },
  ];

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm";

  const normalStyle =
    "text-slate-300 hover:text-white hover:bg-green-800";

  const activeStyle =
    "bg-green-800 text-white";

  return (
    <>
      <aside
        className={`
          bg-green-900
          border-r border-green-950/50
          w-64 fixed top-0 left-0 h-screen
          transition-transform duration-300
          overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col
          p-6
        `}
      >
        {/* FECHAR MOBILE */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-amber-300 hover:text-amber-200 transition cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* LOGO */}
        <div className="mb-10 pt-2">
          <Link
            to="/dashboard/admin"
            className="text-xl font-black tracking-tight flex items-center gap-3"
          >
            <div className="bg-amber-300 text-green-950 p-2 rounded-xl">
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </div>

            <span className="text-white">
              Eco<span className="text-amber-300">Maint</span>
            </span>
          </Link>

          <p className="text-[10px] text-slate-400 mt-4 uppercase font-black tracking-[0.2em]">
            Painel Administrativo
          </p>
        </div>

        {/* MENU */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${linkStyle} ${
                isActive(item.path)
                  ? activeStyle
                  : normalStyle
              }`}
            >
              <i
                className={`fa-solid ${item.icon} ${
                  isActive(item.path)
                    ? "text-amber-300"
                    : "text-slate-400"
                }`}
              ></i>

              {item.label}
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="pt-6 border-t border-green-950/50">
          <button
            className="
              flex items-center gap-3
              cursor-pointer
              w-full
              px-4 py-3
              rounded-xl
              text-slate-300
              hover:text-white
              hover:bg-green-800
              transition-all
              font-bold
              text-sm
              group
            "
          >
            <i className="fa-solid fa-arrow-right-from-bracket group-hover:translate-x-1 transition-transform"></i>

            Sair da conta
          </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-green-950/70 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
