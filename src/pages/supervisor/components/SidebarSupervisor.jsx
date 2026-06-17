import { Link, useLocation } from "react-router-dom";

export default function SidebarSupervisor({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Mantendo a estrutura organizada por secções
  const menuSections = [
    {
      title: "Core",
      items: [
        { label: "Dashboard", icon: "fa-gauge-high", path: "/dashboard/admin" },
      ],
    },
    {
      title: "Operações",
      items: [
        { label: "Ocorrências", icon: "fa-triangle-exclamation", path: "/dashboard/admin/ocorrencias" },
      ],
    },
    {
      title: "Gestão",
      items: [
        { label: "Relatórios", icon: "fa-file-lines", path: "/dashboard/admin/relatorios" },
        { label: "Indicadores", icon: "fa-chart-line", path: "/dashboard/admin/indicadores" },
      ],
    },
    {
      title: "Sistema",
      items: [
        { label: "Configurações", icon: "fa-gear", path: "/dashboard/admin/configuracoes" },
      ],
    },
  ];

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm relative group";

  // Esquema de cores aprovado: Branco Gelo com opacidade para leitura perfeita
  const normalStyle =
    "text-slate-100/70 hover:text-slate-100 hover:bg-green-800/60";

  const activeStyle =
    "bg-green-800 text-white shadow-md shadow-green-950/30";

  return (
    <>
      <aside
        className={`
          bg-green-900
          border-r border-green-950/60
          w-64 fixed top-0 left-0 h-screen
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col
          p-5 justify-between
        `}
      >
        <div>
          {/* FECHAR MOBILE */}
          <button
            className="md:hidden absolute top-5 right-5 text-xl text-amber-300 hover:text-amber-200 transition cursor-pointer p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* LOGO */}
          <div className="mb-8 px-2 pt-2">
            <Link
              to="/dashboard/admin"
              className="text-xl font-black tracking-tight flex items-center gap-3"
            >
              <div className="bg-amber-300 text-green-950 p-2 rounded-xl shadow-md shadow-yellow-700/10">
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
          <nav className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                {/* Título da secção usando o Cinza Esverdeado/Sage da tua paleta */}
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.18em] px-4 mb-2">
                  {section.title}
                </p>

                {section.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${linkStyle} ${active ? activeStyle : normalStyle}`}
                    >
                      {/* Detalhe Premium: Indicador lateral ativo em Bege/Dourado */}
                      {active && (
                        <span className="absolute left-0 top-3 bottom-3 w-1 bg-amber-300 rounded-r-full" />
                      )}

                      {/* Ícones inativos com o Cinza Esverdeado e transição para o Bege Claro no Hover */}
                      <i
                        className={`fa-solid ${item.icon} w-5 text-center text-base transition-colors duration-300 ${
                          active
                            ? "text-amber-300"
                            : "text-slate-400 group-hover:text-amber-200"
                        }`}
                      ></i>

                      <span className="tracking-wide">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="pt-4 mt-6 border-t border-green-950/40">
          <button
            className="
              flex items-center gap-3
              cursor-pointer
              w-full
              px-4 py-3
              rounded-xl
              text-slate-100/70
              hover:text-slate-100
              hover:bg-green-800/40
              transition-all
              font-bold
              text-sm
              group
            "
          >
            <i className="fa-solid fa-arrow-right-from-bracket text-slate-400 group-hover:text-amber-200 group-hover:translate-x-1 transition-all"></i>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-green-950/60 backdrop-blur-md md:hidden z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}