import { useState } from "react";
import TecnicoLayout from "./components/TecnicoLayout";
import Modal from "./components/Modal";
import ModalSmall from "./components/ModalSmall";

export default function ManutencaoTecnico() {
  const [openNovaManutencao, setOpenNovaManutencao] = useState(false);
  const [openExcluirManutencao, setOpenExcluirManutencao] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);

  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // Dados fictícios estruturados com os campos solicitados
  const manutencoes = [
    {
      id: "MNT-001",
      equipamento: "Gerador Elétrico Principal (EQ-001)",
      tipo: "Preventiva",
      periodicidade: "Mensal",
      responsavel: "Eng. Carlos Silva",
      checklist: "Verificar nível de óleo, testar baterias de arranque, limpar filtros de ar.",
      dataInicial: "2026-06-15",
    },
    {
      id: "MNT-002",
      equipamento: "Compressor Industrial B3 (EQ-002)",
      tipo: "Corretiva",
      periodicidade: "Pontual",
      responsavel: "Téc. Roberto Souza",
      checklist: "Substituir válvula de pressão danificada e recalibrar manómetro.",
      dataInicial: "2026-06-11",
    },
    {
      id: "MNT-003",
      equipamento: "Painel de Distribuição Geral (EQ-003)",
      tipo: "Preditiva",
      periodicidade: "Trimestral",
      responsavel: "Eng. Ana Costa",
      checklist: "Análise termográfica dos barramentos principais para deteção de pontos quentes.",
      dataInicial: "2026-06-20",
    },
  ];

  const handleNovaManutencao = () => {
    setManutencaoSelecionada(null);
    setModoEdicao(false);
    setOpenNovaManutencao(true);
  };

  const handleEditarManutencao = (mnt) => {
    setManutencaoSelecionada(mnt);
    setModoEdicao(true);
    setOpenNovaManutencao(true);
  };

  const handleExcluirManutencao = (mnt) => {
    setManutencaoSelecionada(mnt);
    setOpenExcluirManutencao(true);
  };

  return (
    <>
      <title>Manutenções | EcoMaint</title>

      <TecnicoLayout title="Manutenções">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Plano de Manutenções
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Gira as manutenções preventivas, corretivas e preditivas dos ativos da empresa.
              </p>
            </div>

            <button
              onClick={handleNovaManutencao}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/5 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              Agendar Manutenção
            </button>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            {/* Pesquisa por Equipamento ou Responsável */}
            <div className="relative col-span-1 sm:col-span-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Pesquisar equipamento ou responsável..."
                value={filtroPesquisa}
                onChange={(e) => setFiltroPesquisa(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-semibold text-slate-700"
              />
            </div>

            {/* Filtro por Tipo */}
            <div className="relative">
              <i className="fa-solid fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Tipos</option>
                <option value="Preventiva">Preventiva</option>
                <option value="Corretiva">Corretiva</option>
                <option value="Preditiva">Preditiva</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            {/* Contador */}
            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              Total: <span className="text-green-900 ml-1 font-black">{manutencoes.length} Agendamentos</span>
            </div>
          </div>

          {/* LISTAGEM EM FORMATO DE CARDS EMPILHADOS */}
          <div className="grid grid-cols-1 gap-4">
            {manutencoes.map((mnt) => (
              <div
                key={mnt.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between group relative overflow-hidden gap-4"
              >
                {/* Linha estética baseada no Tipo de Manutenção */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 
                  ${mnt.tipo === "Preventiva" ? "bg-blue-600" : ""}
                  ${mnt.tipo === "Corretiva" ? "bg-red-600" : ""}
                  ${mnt.tipo === "Preditiva" ? "bg-purple-600" : ""}
                `} />

                {/* Bloco do Equipamento e ID */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 pl-2">
                  <div className="shrink-0">
                    <span className="text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg tracking-wide inline-block">
                      {mnt.id}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-green-900 text-base leading-tight group-hover:text-green-800 transition-colors truncate">
                      {mnt.equipamento}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 font-medium line-clamp-1">
                      <span className="font-bold text-slate-500">Checklist:</span> {mnt.checklist}
                    </p>
                  </div>
                </div>

                {/* Detalhes Técnicos e Prazos */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                  {/* Responsável */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Responsável</span>
                    <span className="font-bold text-slate-700 truncate max-w-35">{mnt.responsavel}</span>
                  </div>

                  {/* Periodicidade */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Periodicidade</span>
                    <span className="font-semibold text-slate-600">{mnt.periodicidade}</span>
                  </div>

                  {/* Data Inicial */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Data Inicial</span>
                    <span className="font-semibold text-slate-500 flex items-center gap-1">
                      <i className="fa-regular fa-calendar-days text-[10px] text-slate-400"></i> {mnt.dataInicial.split('-').reverse().join('/')}
                    </span>
                  </div>

                  {/* Badge de Tipo */}
                  <div className="flex flex-col justify-center col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                    <span
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black w-fit
                        ${mnt.tipo === "Preventiva" ? "bg-blue-50 text-blue-700" : ""}
                        ${mnt.tipo === "Corretiva" ? "bg-red-50 text-red-700" : ""}
                        ${mnt.tipo === "Preditiva" ? "bg-purple-50 text-purple-700" : ""}
                      `}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full 
                        ${mnt.tipo === "Preventiva" ? "bg-blue-600" : ""}
                        ${mnt.tipo === "Corretiva" ? "bg-red-600" : ""}
                        ${mnt.tipo === "Preditiva" ? "bg-purple-600" : ""}
                      `} />
                      {mnt.tipo}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="border-t lg:border-t-0 border-slate-50 pt-3 lg:pt-0 flex items-center justify-between lg:justify-end shrink-0 lg:pl-4">
                  <span className="text-[10px] text-slate-400 font-bold lg:hidden">Ações disponíveis:</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleEditarManutencao(mnt)}
                      className="p-2 hover:bg-slate-50 text-slate-400 hover:text-green-900 rounded-lg transition border border-transparent hover:border-slate-100 cursor-pointer" 
                      title="Editar Agendamento"
                    >
                      <i className="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button 
                      onClick={() => handleExcluirManutencao(mnt)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition border border-transparent hover:border-red-100 cursor-pointer" 
                      title="Remover Agendamento"
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
          isOpen={openNovaManutencao}
          onClose={() => setOpenNovaManutencao(false)}
          title={modoEdicao ? "Editar Manutenção" : "Agendar Nova Manutenção"}
          icon={modoEdicao ? "fa-solid fa-pen-to-square" : "fa-solid fa-screwdriver-wrench"}
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Equipamento */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Equipamento Alvo
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-gears absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={manutencaoSelecionada?.equipamento || ""}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Selecione o equipamento...</option>
                      <option>Gerador Elétrico Principal (EQ-001)</option>
                      <option>Compressor Industrial B3 (EQ-002)</option>
                      <option>Painel de Distribuição Geral (EQ-003)</option>
                    </select>
                  </div>
                </div>

                {/* Tipo de Manutenção */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Tipo de Manutenção
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-chart-pie absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={manutencaoSelecionada?.tipo || "Preventiva"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Preventiva</option>
                      <option>Corretiva</option>
                      <option>Preditiva</option>
                    </select>
                  </div>
                </div>

                {/* Periodicidade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Periodicidade
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-retweet absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={manutencaoSelecionada?.periodicidade || "Mensal"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Pontual</option>
                      <option>Diária</option>
                      <option>Semanal</option>
                      <option>Mensal</option>
                      <option>Trimestral</option>
                      <option>Semestral</option>
                      <option>Anual</option>
                    </select>
                  </div>
                </div>

                {/* Responsável */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Técnico / Responsável
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user-gear absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      defaultValue={manutencaoSelecionada?.responsavel || ""}
                      placeholder="Ex: Eng. Carlos Silva"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Data Inicial */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Data Inicial
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      defaultValue={manutencaoSelecionada?.dataInicial || ""}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

                {/* Checklist */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Checklist / Instruções de Procedimento
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-list-check absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows={3}
                      defaultValue={manutencaoSelecionada?.checklist || ""}
                      placeholder="Descreva detalhadamente as tarefas passo-a-passo que o técnico deve executar..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  {modoEdicao ? "Salvar Alterações no Plano" : "Confirmar Agendamento"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL SMALL PARA CONFIRMAÇÃO DE EXCLUSÃO */}
        <ModalSmall
          isOpen={openExcluirManutencao}
          onClose={() => setOpenExcluirManutencao(false)}
          title="Remover Agendamento"
          icon="fa-solid fa-trash-can"
        >
          <div className="p-1 space-y-4 text-center sm:text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              Tem a certeza de que deseja cancelar o agendamento de manutenção{" "}
              <span className="font-black text-green-900">
                {manutencaoSelecionada?.id}
              </span>{" "}
              para o equipamento{" "}
              <span className="font-bold text-slate-700">
                {manutencaoSelecionada?.equipamento.split(" (")[0]}
              </span>
              ? Esta operação é irreversível.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOpenExcluirManutencao(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Manter Agendamento
              </button>
              <button
                onClick={() => {
                  // Operação de remoção finaliza aqui
                  setOpenExcluirManutencao(false);
                }}
                className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-xs transition shadow-md shadow-red-600/10 cursor-pointer"
              >
                Sim, Remover
              </button>
            </div>
          </div>
        </ModalSmall>

      </TecnicoLayout>
    </>
  );
}
