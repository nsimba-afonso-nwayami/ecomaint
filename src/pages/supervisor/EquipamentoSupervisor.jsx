import { useState } from "react";
import SupervisorLayout from "./components/SupervisorLayout";
import Modal from "./components/Modal";
import ModalSmall from "./components/ModalSmall"; // Importado o ModalSmall

export default function EquipamentosSupervisor() {
  const [openNovoEquipamento, setOpenNovoEquipamento] = useState(false);
  const [openExcluirEquipamento, setOpenExcluirEquipamento] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  
  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");

  // Dados fictícios
  const equipamentos = [
    {
      codigo: "EQ-001",
      nome: "Gerador Elétrico Principal",
      categoria: "Energia",
      departamento: "Produção",
      estado: "Operacional",
      ultimaManutencao: "08/06/2026",
    },
    {
      codigo: "EQ-002",
      nome: "Compressor Industrial B3",
      categoria: "Pneumática",
      departamento: "Operações",
      estado: "Manutenção",
      ultimaManutencao: "24/05/2026",
    },
    {
      codigo: "EQ-003",
      nome: "Painel de Distribuição Geral",
      categoria: "Elétrica",
      departamento: "Infraestrutura",
      estado: "Avaria",
      ultimaManutencao: "12/04/2026",
    },
  ];

  // Função para abrir o cadastro limpo
  const handleNovoEquipamento = () => {
    setEquipamentoSelecionado(null);
    setModoEdicao(false);
    setOpenNovoEquipamento(true);
  };

  // Função para abrir a edição com os dados preenchidos
  const handleEditarEquipamento = (eq) => {
    setEquipamentoSelecionado(eq);
    setModoEdicao(true);
    setOpenNovoEquipamento(true);
  };

  // Função para abrir o aviso de exclusão
  const handleExcluirEquipamento = (eq) => {
    setEquipamentoSelecionado(eq);
    setOpenExcluirEquipamento(true);
  };

  return (
    <>
      <title>Equipamentos | EcoMaint</title>

      <SupervisorLayout title="Equipamentos">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Gestão de Equipamentos
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Consulte, monitorize e registe os ativos físicos da empresa através de módulos dinâmicos.
              </p>
            </div>

            <button
              onClick={handleNovoEquipamento}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/5 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              Cadastrar Equipamento
            </button>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Pesquisar por código ou nome..."
                value={filtroPesquisa}
                onChange={(e) => setFiltroPesquisa(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-semibold text-slate-700"
              />
            </div>

            <div className="relative">
              <i className="fa-solid fa-circle-dot absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Estados</option>
                <option value="Operacional">Operacional</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Avaria">Avaria</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            <div className="relative">
              <i className="fa-solid fa-building absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={filtroDepartamento}
                onChange={(e) => setFiltroDepartamento(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Departamentos</option>
                <option value="Produção">Produção</option>
                <option value="Operações">Operações</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Logística">Logística</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              Exibindo: <span className="text-green-900 ml-1 font-black">{equipamentos.length} Equipamentos</span>
            </div>
          </div>

          {/* LISTAGEM EM FORMATO DE CARDS EMPILHADOS */}
          <div className="grid grid-cols-1 gap-4">
            {equipamentos.map((eq) => (
              <div
                key={eq.codigo}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between group relative overflow-hidden gap-4"
              >
                <div className={`absolute top-0 bottom-0 left-0 w-1 
                  ${eq.estado === "Operacional" ? "bg-green-600" : ""}
                  ${eq.estado === "Manutenção" ? "bg-amber-500" : ""}
                  ${eq.estado === "Avaria" ? "bg-red-600" : ""}
                `} />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 pl-2">
                  <div className="shrink-0">
                    <span className="text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg tracking-wide inline-block">
                      {eq.codigo}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-green-900 text-base leading-tight group-hover:text-green-800 transition-colors truncate">
                      {eq.nome}
                    </h3>
                    <span className="text-[10px] bg-slate-50 text-slate-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block">
                      {eq.categoria}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                  <div className="flex sm:flex-col justify-between sm:justify-center gap-1">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Departamento</span>
                    <span className="font-bold text-slate-700">{eq.departamento}</span>
                  </div>

                  <div className="flex sm:flex-col justify-between sm:justify-center gap-1">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Última Manutenção</span>
                    <span className="font-semibold text-slate-500 flex items-center gap-1">
                      <i className="fa-regular fa-calendar text-[10px] text-slate-400"></i> {eq.ultimaManutencao}
                    </span>
                  </div>

                  <div className="flex justify-between sm:justify-center items-center">
                    <span className="text-slate-400 font-medium sm:hidden">Estado</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black
                        ${eq.estado === "Operacional" ? "bg-green-50 text-green-700" : ""}
                        ${eq.estado === "Manutenção" ? "bg-amber-50 text-amber-700" : ""}
                        ${eq.estado === "Avaria" ? "bg-red-50 text-red-700" : ""}
                      `}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full 
                        ${eq.estado === "Operacional" ? "bg-green-600" : ""}
                        ${eq.estado === "Manutenção" ? "bg-amber-500" : ""}
                        ${eq.estado === "Avaria" ? "bg-red-600" : ""}
                      `} />
                      {eq.estado}
                    </span>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO COM ONCLICK CONFIGURADO */}
                <div className="border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0 flex items-center justify-between sm:justify-end shrink-0 sm:pl-4">
                  <span className="text-[10px] text-slate-400 font-bold sm:hidden">Ações disponíveis:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleEditarEquipamento(eq)}
                      className="p-2 hover:bg-slate-50 text-slate-400 hover:text-green-900 rounded-lg transition border border-transparent hover:border-slate-100 cursor-pointer" 
                      title="Editar Equipamento"
                    >
                      <i className="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleExcluirEquipamento(eq)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition border border-transparent hover:border-red-100 cursor-pointer" 
                      title="Eliminar Ativo"
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
          isOpen={openNovoEquipamento}
          onClose={() => setOpenNovoEquipamento(false)}
          title={modoEdicao ? "Editar Equipamento" : "Cadastrar Novo Equipamento"}
          icon={modoEdicao ? "fa-solid fa-pen-to-square" : "fa-solid fa-gears"}
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Código Interno */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Código Interno
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-barcode absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      defaultValue={equipamentoSelecionado?.codigo || ""}
                      disabled={modoEdicao} // Opcional: bloquear código na edição
                      placeholder="Ex: EQ-204"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Nome */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Nome do Equipamento
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-tag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      defaultValue={equipamentoSelecionado?.nome || ""}
                      placeholder="Ex: Compressor de Ar"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Modelo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Modelo
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-cubes absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Premium v2"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Fabricante */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Fabricante
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-industry absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Siemens, Bosch"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Número de Série */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Número de Série
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-fingerprint absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: SN-987654321"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Departamento */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Departamento Alocado
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={equipamentoSelecionado?.departamento || "Produção"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Produção</option>
                      <option>Operações</option>
                      <option>Infraestrutura</option>
                      <option>Logística</option>
                    </select>
                  </div>
                </div>

                {/* Localização */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Localização Exata
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-map-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Pavilhão B - Setor de Montagem Nordeste"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Data de Aquisição */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Data de Aquisição
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

                {/* Vida Útil */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Vida Útil Estimada
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-hourglass-half absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: 5 anos, 10.000 horas"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  {modoEdicao ? "Guardar Alterações" : "Registar Ativo no Sistema"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL SMALL PARA CONFIRMAÇÃO DE EXCLUSÃO */}
        <ModalSmall
          isOpen={openExcluirEquipamento}
          onClose={() => setOpenExcluirEquipamento(false)}
          title="Eliminar Equipamento"
          icon="fa-solid fa-trash-can"
        >
          <div className="p-1 space-y-4 text-center sm:text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              Tem a certeza de que deseja eliminar o equipamento{" "}
              <span className="font-black text-green-900">
                {equipamentoSelecionado?.nome} ({equipamentoSelecionado?.codigo})
              </span>
              ? Esta ação não pode ser desfeita e removerá o ativo permanentemente.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOpenExcluirEquipamento(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Lógica de exclusão aqui
                  setOpenExcluirEquipamento(false);
                }}
                className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-xs transition shadow-md shadow-red-600/10 cursor-pointer"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </ModalSmall>

      </SupervisorLayout>
    </>
  );
}
