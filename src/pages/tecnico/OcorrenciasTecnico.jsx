import { useState } from "react";
import TecnicoLayout from "./components/TecnicoLayout";
import Modal from "./components/Modal";
import ModalSmall from "./components/ModalSmall";

export default function OcorrenciasSupervisor() {
  const [openNovaOcorrencia, setOpenNovaOcorrencia] = useState(false);
  const [openFecharOcorrencia, setOpenFecharOcorrencia] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);

  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState("");

  // Dados mockados estruturados com o ciclo de vida operacional (Estado)
  const [ocorrencias, setOcorrencias] = useState([
    {
      id: "OCR-001",
      equipamento: "Caldeira Industrial - Bloco B",
      tipoFalha: "Crítica / Sobreaquecimento",
      descricao: "Válvula de alívio presa, provocando picos anormais de pressão e temperatura.",
      data: "2026-06-11",
      responsavel: "António Mateus",
      prioridade: "Alta",
      estado: "Pendente",
    },
    {
      id: "OCR-002",
      equipamento: "Bomba Hidráulica Principal",
      tipoFalha: "Mecânica / Vibração",
      descricao: "Ruído excessivo no rolamento do veio central. Necessita de lubrificação urgente.",
      data: "2026-06-10",
      responsavel: "Valeriano Kipanda",
      prioridade: "Média",
      estado: "Em Resolução",
    },
    {
      id: "OCR-003",
      equipamento: "Gerador de Emergência Caterpillar",
      tipoFalha: "Elétrica / Alternador",
      descricao: "Falha na transição automática de carga durante o teste de rotina semanal.",
      data: "2026-06-08",
      responsavel: "Nsimba Afonso",
      prioridade: "Baixa",
      estado: "Resolvido",
    },
  ]);

  // Filtragem dinâmica e reativa dos dados
  const ocorrenciasFiltradas = ocorrencias.filter((ocr) => {
    const correspondePesquisa =
      ocr.equipamento.toLowerCase().includes(filtroPesquisa.toLowerCase()) ||
      ocr.tipoFalha.toLowerCase().includes(filtroPesquisa.toLowerCase()) ||
      ocr.id.toLowerCase().includes(filtroPesquisa.toLowerCase());
    
    const correspondePrioridade = filtroPrioridade === "" || ocr.prioridade === filtroPrioridade;

    return correspondePesquisa && correspondePrioridade;
  });

  const handleNovaOcorrencia = () => {
    setOcorrenciaSelecionada(null);
    setModoEdicao(false);
    setOpenNovaOcorrencia(true);
  };

  const handleEditarOcorrencia = (ocr) => {
    setOcorrenciaSelecionada(ocr);
    setModoEdicao(true);
    setOpenNovaOcorrencia(true);
  };

  const handleFecharOcorrencia = (ocr) => {
    setOcorrenciaSelecionada(ocr);
    setOpenFecharOcorrencia(true);
  };

  const confirmarFechamento = () => {
    if (ocorrenciaSelecionada) {
      setOcorrencias(
        ocorrencias.map((ocr) =>
          ocr.id === ocorrenciaSelecionada.id ? { ...ocr, estado: "Resolvido" } : ocr
        )
      );
    }
    setOpenFecharOcorrencia(false);
  };

  return (
    <>
      <title>Ocorrências | EcoMaint</title>

      <TecnicoLayout title="Ocorrências">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Registo e Monitoria de Ocorrências
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Gira anomalias ativas, falhas de equipamentos e ordens de reparação imediatas comunicadas pelas equipas técnicas.
              </p>
            </div>

            <button
              onClick={handleNovaOcorrencia}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-amber-500/5 self-start sm:self-auto"
            >
              <i className="fa-solid fa-circle-plus text-xs"></i>
              Nova Ocorrência
            </button>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            {/* Pesquisa Geral */}
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Pesquisar equipamento ou falha..."
                value={filtroPesquisa}
                onChange={(e) => setFiltroPesquisa(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-semibold text-slate-700"
              />
            </div>

            {/* Filtro por Criticidade/Prioridade */}
            <div className="relative">
              <i className="fa-solid fa-triangle-exclamation absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={filtroPrioridade}
                onChange={(e) => setFiltroPrioridade(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Níveis</option>
                <option value="Alta">Prioridade Alta</option>
                <option value="Média">Prioridade Média</option>
                <option value="Baixa">Prioridade Baixa</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            {/* Contador Dinâmico */}
            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              A mostrar: <span className="text-green-900 ml-1 font-black">{ocorrenciasFiltradas.length} de {ocorrencias.length}</span>
            </div>
          </div>

          {/* LISTAGEM EM FORMATO DE CARDS EMPILHADOS */}
          <div className="grid grid-cols-1 gap-4">
            {ocorrenciasFiltradas.length > 0 ? (
              ocorrenciasFiltradas.map((ocr) => (
                <div
                  key={ocr.id}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between group relative overflow-hidden gap-4"
                >
                  {/* Linha de Severidade lateral */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 
                    ${ocr.prioridade === "Baixa" ? "bg-blue-500" : ""}
                    ${ocr.prioridade === "Média" ? "bg-amber-500" : ""}
                    ${ocr.prioridade === "Alta" ? "bg-red-600" : ""}
                  `} />

                  {/* Bloco Detalhes Principais */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 pl-2">
                    <div className="shrink-0">
                      <span className="text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg tracking-wide inline-block">
                        {ocr.id}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-green-900 text-base leading-tight group-hover:text-green-800 transition-colors truncate">
                        {ocr.equipamento}
                      </h3>
                      <p className="text-red-700 text-xs mt-0.5 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-wrench text-[10px]"></i> {ocr.tipoFalha}
                      </p>
                      <p className="text-slate-500 text-xs mt-1.5 font-medium line-clamp-2 md:max-w-2xl">
                        {ocr.descricao}
                      </p>
                    </div>
                  </div>

                  {/* Metadados Técnicos */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                    {/* Técnico Responsável */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Responsável</span>
                      <span className="font-bold text-slate-700 truncate max-w-40 flex items-center gap-1">
                        <i className="fa-solid fa-user-gear text-slate-400 text-[11px]"></i> {ocr.responsavel}
                      </span>
                    </div>

                    {/* Estado Operacional */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Estado</span>
                      <span className={`font-semibold flex items-center gap-1 
                        ${ocr.estado === "Pendente" ? "text-red-600" : ""}
                        ${ocr.estado === "Em Resolução" ? "text-amber-600" : ""}
                        ${ocr.estado === "Resolvido" ? "text-green-700" : ""}
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full 
                          ${ocr.estado === "Pendente" ? "bg-red-600" : ""}
                          ${ocr.estado === "Em Resolução" ? "bg-amber-500" : ""}
                          ${ocr.estado === "Resolvido" ? "bg-green-600" : ""}
                        `} /> 
                        {ocr.estado}
                      </span>
                    </div>

                    {/* Badge de Impacto */}
                    <div className="flex flex-col justify-center col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                      <span
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black w-fit
                          ${ocr.prioridade === "Baixa" ? "bg-blue-50 text-blue-700" : ""}
                          ${ocr.prioridade === "Média" ? "bg-amber-50 text-amber-700" : ""}
                          ${ocr.prioridade === "Alta" ? "bg-red-50 text-red-700" : ""}
                        `}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          ocr.prioridade === "Alta" ? "bg-red-600" :
                          ocr.prioridade === "Média" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        {ocr.prioridade}
                      </span>
                    </div>
                  </div>

                  {/* Ações Rápidas do Supervisor */}
                  <div className="border-t lg:border-t-0 border-slate-50 pt-3 lg:pt-0 flex items-center justify-between lg:justify-end shrink-0 lg:pl-4">
                    <span className="text-[10px] text-slate-400 font-bold lg:hidden">Ações:</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditarOcorrencia(ocr)}
                        className="p-2 hover:bg-slate-50 text-slate-400 hover:text-green-900 rounded-lg transition border border-transparent hover:border-slate-100 cursor-pointer" 
                        title="Editar Detalhes"
                      >
                        <i className="fa-solid fa-pen-to-square text-xs"></i>
                      </button>

                      {ocr.estado !== "Resolvido" && (
                        <button 
                          onClick={() => handleFecharOcorrencia(ocr)}
                          className="p-2 hover:bg-green-50 text-slate-400 hover:text-green-700 rounded-lg transition border border-transparent hover:border-green-100 cursor-pointer" 
                          title="Fechar / Validar Resolução"
                        >
                          <i className="fa-solid fa-circle-check text-xs"></i>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <i className="fa-solid fa-magnifying-glass text-slate-300 text-3xl mb-3 block"></i>
                <p className="text-slate-500 text-sm font-semibold">Nenhuma ocorrência encontrada para os filtros aplicados.</p>
              </div>
            )}
          </div>
        </section>

        {/* MODAL DE CADASTRO / EDIÇÃO DE OCORRÊNCIA */}
        <Modal
          isOpen={openNovaOcorrencia}
          onClose={() => setOpenNovaOcorrencia(false)}
          title={modoEdicao ? "Atualizar Registo de Ocorrência" : "Registar Nova Ocorrência Técnica"}
          icon={modoEdicao ? "fa-solid fa-file-pen" : "fa-solid fa-triangle-exclamation"}
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Equipamento */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Equipamento / Ativo Afetado
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-industry absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      required
                      defaultValue={ocorrenciaSelecionada?.equipamento || ""}
                      placeholder="Ex: Compressor de Ar Comprimido N3"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Tipo de Falha */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Tipo de Falha / Sintoma
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-bolt-lightning absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      required
                      defaultValue={ocorrenciaSelecionada?.tipoFalha || ""}
                      placeholder="Ex: Curto-circuito ou Quebra Estrutural"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Técnico Responsável */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Técnico Responsável (Reporte)
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={ocorrenciaSelecionada?.responsavel || "António Mateus"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer font-semibold text-slate-700"
                    >
                      <option>Nsimba Afonso</option>
                      <option>António Mateus</option>
                      <option>Valeriano Kipanda</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Data da Ocorrência
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      required
                      defaultValue={ocorrenciaSelecionada?.data || "2026-06-11"}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-bold text-slate-700"
                    />
                  </div>
                </div>

                {/* Impacto / Prioridade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Nível de Urgência
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={ocorrenciaSelecionada?.prioridade || "Média"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer font-bold text-slate-700"
                    >
                      <option>Alta</option>
                      <option>Média</option>
                      <option>Baixa</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                  </div>
                </div>

                {/* Estado Interno (Visível em modo Edição) */}
                {modoEdicao && (
                  <div>
                    <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                      Progresso de Resolução
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-spinner absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                      <select 
                        defaultValue={ocorrenciaSelecionada?.estado || "Pendente"}
                        className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer font-bold text-slate-700"
                      >
                        <option>Pendente</option>
                        <option>Em Resolução</option>
                        <option>Resolvido</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>
                )}

                {/* Descrição Detalhada */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Descrição Detalhada do Incidente
                  </label>
                  <textarea
                    rows="3"
                    required
                    defaultValue={ocorrenciaSelecionada?.descricao || ""}
                    placeholder="Descreva minuciosamente o estado físico do ativo, anomalias detetadas e ações de contenção preliminares efetuadas..."
                    className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-medium text-slate-800 resize-none"
                  />
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  {modoEdicao ? "Gravar Alterações à Ocorrência" : "Gravar e Notificar Engenharia"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL SMALL PARA ENCERRAMENTO COORDENADO DA OCORRÊNCIA */}
        <ModalSmall
          isOpen={openFecharOcorrencia}
          onClose={() => setOpenFecharOcorrencia(false)}
          title="Validar Encerramento"
          icon="fa-solid fa-circle-check"
        >
          <div className="p-1 space-y-4 text-center sm:text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              Confirma que a anomalia no equipamento{" "}
              <span className="font-black text-green-900">
                {ocorrenciaSelecionada?.equipamento}
              </span>{" "}
              was totalmente retificada com sucesso e o ativo pode voltar a operar em segurança?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOpenFecharOcorrencia(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Manter Aberta
              </button>
              <button
                onClick={confirmarFechamento}
                className="w-full sm:w-1/2 bg-green-700 hover:bg-green-800 text-white font-black py-3 px-4 rounded-xl text-xs transition shadow-md shadow-green-700/10 cursor-pointer"
              >
                Sim, Fechar Ocorrência
              </button>
            </div>
          </div>
        </ModalSmall>

      </TecnicoLayout>
    </>
  );
}
