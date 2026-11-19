import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import ModalSmall from "./components/ModalSmall";

export default function UtilizadoresAdmin() {
  const [openNovoUtilizador, setOpenNovoUtilizador] = useState(false);
  const [openExcluirUtilizador, setOpenExcluirUtilizador] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(null);

  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroPerfil, setFiltroPerfil] = useState("");

  // Dados fictícios baseados nos campos solicitados e alinhados ao padrão
  const utilizadores = [
    {
      id: "USR-001",
      nome: "Nsimba Afonso",
      email: "nsimba.afonso@ecomaint.com",
      telefone: "+244 923 000 000",
      perfil: "Administrador",
      departamento: "Engenharia & Infraestrutura",
      estado: "Ativo",
    },
    {
      id: "USR-002",
      nome: "António Mateus",
      email: "a.mateus@ecomaint.com",
      telefone: "+244 931 111 222",
      perfil: "Técnico",
      departamento: "Produção Industrial",
      estado: "Ativo",
    },
    {
      id: "USR-003",
      nome: "Valeriano Kipanda",
      email: "v.kipanda@ecomaint.com",
      telefone: "+244 945 444 555",
      perfil: "Supervisor",
      departamento: "Logística & Frota",
      estado: "Inativo",
    },
  ];

  const handleNovoUtilizador = () => {
    setUtilizadorSelecionado(null);
    setModoEdicao(false);
    setOpenNovoUtilizador(true);
  };

  const handleEditarUtilizador = (usr) => {
    setUtilizadorSelecionado(usr);
    setModoEdicao(true);
    setOpenNovoUtilizador(true);
  };

  const handleExcluirUtilizador = (usr) => {
    setUtilizadorSelecionado(usr);
    setOpenExcluirUtilizador(true);
  };

  return (
    <>
      <title>Utilizadores | EcoMaint</title>

      <AdminLayout title="Utilizadores">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Gestão de Utilizadores e Acessos
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Controle os perfis, dados de contacto, lotações laboratoriais ou departamentais e permissões internas da plataforma.
              </p>
            </div>

            <button
              onClick={handleNovoUtilizador}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/5 self-start sm:self-auto"
            >
              <i className="fa-solid fa-user-plus text-xs"></i>
              Novo Utilizador
            </button>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            {/* Pesquisa Geral */}
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Pesquisar utilizador ou email..."
                value={filtroPesquisa}
                onChange={(e) => setFiltroPesquisa(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-semibold text-slate-700"
              />
            </div>

            {/* Filtro Tipo de Perfil */}
            <div className="relative">
              <i className="fa-solid fa-user-shield absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={filtroPerfil}
                onChange={(e) => setFiltroPerfil(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Perfis</option>
                <option value="Administrador">Administrador</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Técnico">Técnico</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            {/* Contador */}
            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              Total: <span className="text-green-900 ml-1 font-black">{utilizadores.length} Utilizadores</span>
            </div>
          </div>

          {/* LISTAGEM EM FORMATO DE CARDS EMPILHADOS */}
          <div className="grid grid-cols-1 gap-4">
            {utilizadores.map((usr) => (
              <div
                key={usr.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between group relative overflow-hidden gap-4"
              >
                {/* Indicador de Tipo de Perfil na borda lateral */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 
                  ${usr.perfil === "Técnico" ? "bg-blue-500" : ""}
                  ${usr.perfil === "Supervisor" ? "bg-amber-500" : ""}
                  ${usr.perfil === "Administrador" ? "bg-red-600" : ""}
                `} />

                {/* Bloco Detalhes Principais */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 pl-2">
                  <div className="shrink-0">
                    <span className="text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg tracking-wide inline-block">
                      {usr.id}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-green-900 text-base leading-tight group-hover:text-green-800 transition-colors truncate">
                      {usr.nome}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 font-medium line-clamp-1">
                      {usr.email} • {usr.telefone}
                    </p>
                  </div>
                </div>

                {/* Metadados Técnicos */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                  {/* Departamento ou Lotação */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Departamento</span>
                    <span className="font-bold text-slate-700 truncate max-w-40">{usr.departamento || "Não Vinculado"}</span>
                  </div>

                  {/* Estado do Utilizador */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Estado</span>
                    <span className={`font-semibold flex items-center gap-1 ${usr.estado === "Ativo" ? "text-green-700" : "text-slate-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${usr.estado === "Ativo" ? "bg-green-600" : "bg-slate-400"}`} /> {usr.estado}
                    </span>
                  </div>

                  {/* Badge de Perfil Operacional */}
                  <div className="flex flex-col justify-center col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <span
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black w-fit
                        ${usr.perfil === "Técnico" ? "bg-blue-50 text-blue-700" : ""}
                        ${usr.perfil === "Supervisor" ? "bg-amber-50 text-amber-700" : ""}
                        ${usr.perfil === "Administrador" ? "bg-red-50 text-red-700" : ""}
                      `}
                    >
                      <i className={`text-[9px] ${
                        usr.perfil === "Administrador" ? "fa-solid fa-crown" :
                        usr.perfil === "Supervisor" ? "fa-solid fa-user-tie" :
                        "fa-solid fa-helmet-safety"
                      }`}></i>
                      {usr.perfil}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="border-t lg:border-t-0 border-slate-50 pt-3 lg:pt-0 flex items-center justify-between lg:justify-end shrink-0 lg:pl-4">
                  <span className="text-[10px] text-slate-400 font-bold lg:hidden">Ações:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleEditarUtilizador(usr)}
                      className="p-2 hover:bg-slate-50 text-slate-400 hover:text-green-900 rounded-lg transition border border-transparent hover:border-slate-100 cursor-pointer" 
                      title="Editar Utilizador"
                    >
                      <i className="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleExcluirUtilizador(usr)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition border border-transparent hover:border-red-100 cursor-pointer" 
                      title="Eliminar Registo"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* MODAL DE CADASTRO / EDIÇÃO */}
        <Modal
          isOpen={openNovoUtilizador}
          onClose={() => setOpenNovoUtilizador(false)}
          title={modoEdicao ? "Editar Registo de Utilizador" : "Adicionar Novo Perfil Corporativo"}
          icon={modoEdicao ? "fa-solid fa-pen-to-square" : "fa-solid fa-user-plus"}
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Nome Completo */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      required
                      defaultValue={utilizadorSelecionado?.nome || ""}
                      placeholder="Ex: Manuel dos Santos"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Correio Eletrónico */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Correio Eletrónico
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="email"
                      required
                      defaultValue={utilizadorSelecionado?.email || ""}
                      placeholder="m.santos@ecomaint.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Contacto Telefónico */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Contacto Telefónico
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      required
                      defaultValue={utilizadorSelecionado?.telefone || ""}
                      placeholder="+244 9XX XXX XXX"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Perfil Operacional */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Perfil Operacional
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={utilizadorSelecionado?.perfil || "Técnico"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Administrador</option>
                      <option>Supervisor</option>
                      <option>Técnico</option>
                    </select>
                  </div>
                </div>

                {/* Departamento Fixo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Departamento Fixo
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      required
                      defaultValue={utilizadorSelecionado?.departamento || ""}
                      placeholder="Ex: Produção Industrial"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Estado */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Estado do Perfil
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-toggle-on absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={utilizadorSelecionado?.estado || "Ativo"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Ativo</option>
                      <option>Inativo</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  {modoEdicao ? "Salvar Alterações no Registo" : "Submeter Registo de Utilizador"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL SMALL PARA CONFIRMAÇÃO DE EXCLUSÃO */}
        <ModalSmall
          isOpen={openExcluirUtilizador}
          onClose={() => setOpenExcluirUtilizador(false)}
          title="Eliminar Registo"
          icon="fa-solid fa-trash-can"
        >
          <div className="p-1 space-y-4 text-center sm:text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              Tem a certeza de que pretende eliminar permanentemente o registo do utilizador{" "}
              <span className="font-black text-green-900">
                {utilizadorSelecionado?.nome}
              </span>{" "}
              ID{" "}
              <span className="font-bold text-slate-700">
                ({utilizadorSelecionado?.id})
              </span>
              ? Esta ação impedirá de imediato a autenticação e revogará os acessos internos associados a este perfil.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOpenExcluirUtilizador(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setOpenExcluirUtilizador(false);
                }}
                className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-xs transition shadow-md shadow-red-600/10 cursor-pointer"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </ModalSmall>

      </AdminLayout>
    </>
  );
}
