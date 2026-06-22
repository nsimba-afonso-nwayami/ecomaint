import { useState } from "react";
import GestorLayout from "./components/GestorLayout";
import Modal from "./components/Modal";

export default function EquipamentosGestor() {
  const [openFichaTecnica, setOpenFichaTecnica] = useState(false);
  const [openAuditoria, setOpenAuditoria] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  
  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroDepartamento, setFiltroDepartamento] = useState("");

  // Dados dos ativos da infraestrutura com indicadores de gestão (Criticidade e Custos acumulados)
  const equipamentos = [
    {
      codigo: "EQ-001",
      nome: "Gerador Elétrico Principal",
      categoria: "Energia",
      departamento: "Produção",
      estado: "Operacional",
      ultimaManutencao: "08/06/2026",
      fabricante: "Siemens",
      modelo: "SGE-500 kVA",
      numeroSerie: "SN-987654321",
      localizacao: "Pavilhão A - Zona Exterior Sul",
      vidaUtil: "15.000 horas",
      criticidade: "Alta",
      custoAcumulado: "420.000 Kz"
    },
    {
      codigo: "EQ-002",
      nome: "Compressor Industrial B3",
      categoria: "Pneumática",
      departamento: "Operações",
      estado: "Manutenção",
      ultimaManutencao: "24/05/2026",
      fabricante: "Atlas Copco",
      modelo: "GA 37 VSD",
      numeroSerie: "SN-112233445",
      localizacao: "Pavilhão B - Setor de Ar Comprimido",
      vidaUtil: "10 anos",
      criticidade: "Média",
      custoAcumulado: "185.000 Kz"
    },
    {
      codigo: "EQ-003",
      nome: "Painel de Distribuição Geral",
      categoria: "Elétrica",
      departamento: "Infraestrutura",
      estado: "Avaria",
      ultimaManutencao: "12/04/2026",
      fabricante: "Schneider Electric",
      modelo: "PrismaSeT P",
      numeroSerie: "SN-556677889",
      localizacao: "Sala Técnica Central - Bloco C",
      vidaUtil: "20 anos",
      criticidade: "Máxima",
      custoAcumulado: "890.000 Kz"
    },
  ];

  // Filtragem dos equipamentos com base nos inputs do Gestor
  const equipamentosFiltrados = equipamentos.filter((eq) => {
    const correspondePesquisa = eq.nome.toLowerCase().includes(filtroPesquisa.toLowerCase()) || 
                               eq.codigo.toLowerCase().includes(filtroPesquisa.toLowerCase());
    const correspondeEstado = filtroEstado === "" || eq.estado === filtroEstado;
    const correspondeDepartamento = filtroDepartamento === "" || eq.departamento === filtroDepartamento;
    
    return correspondePesquisa && correspondeEstado && correspondeDepartamento;
  });

  // Abrir detalhes em modo leitura estruturada
  const handleVerFichaTecnica = (eq) => {
    setEquipamentoSelecionado(eq);
    setOpenFichaTecnica(true);
  };

  // Abrir painel de controle/auditoria do ativo selecionado
  const handleAuditarAtivo = (eq) => {
    setEquipamentoSelecionado(eq);
    setOpenAuditoria(true);
  };

  return (
    <>
      <title>Equipamentos | EcoMaint</title>

      <GestorLayout title="Equipamentos">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
              <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
              Gestão de Ativos e Equipamentos
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-medium">
              Controle o inventário técnico da planta, analise custos parciais por ativo e configure níveis de criticidade para priorização automática.
            </p>
          </div>

          {/* BARRA DE FILTROS DOS ATIVOS */}
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
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              Listados: <span className="text-green-900 ml-1 font-black">{equipamentosFiltrados.length} / {equipamentos.length} Ativos</span>
            </div>
          </div>

          {/* LISTAGEM PRINCIPAL DOS ATIVOS */}
          <div className="grid grid-cols-1 gap-4">
            {equipamentosFiltrados.map((eq) => (
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
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-slate-50 text-slate-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {eq.categoria}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded
                        ${eq.criticidade === "Máxima" ? "bg-red-50 text-red-600 font-black" : ""}
                        ${eq.criticidade === "Alta" ? "bg-amber-50 text-amber-700" : ""}
                        ${eq.criticidade === "Média" ? "bg-slate-100 text-slate-600" : ""}
                      `}>
                        Criticidade: {eq.criticidade}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                  <div className="flex flex-col justify-center gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Departamento</span>
                    <span className="font-bold text-slate-700">{eq.departamento}</span>
                  </div>

                  <div className="flex flex-col justify-center gap-0.5">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Custo Acumulado</span>
                    <span className="font-bold text-red-600 font-mono">{eq.custoAcumulado}</span>
                  </div>

                  <div className="flex flex-col justify-center gap-0.5 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider hidden sm:block">Estado</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black w-fit
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

                {/* AÇÕES EXCLUSIVAS DO GESTOR */}
                <div className="border-t sm:border-t-0 border-slate-50 pt-3 sm:pt-0 flex items-center justify-between sm:justify-end shrink-0 sm:pl-4">
                  <span className="text-[10px] text-slate-400 font-bold sm:hidden">Opções de Controle:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAuditarAtivo(eq)}
                      className="px-3 py-2 bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-700 rounded-xl transition border border-slate-100 hover:border-amber-100 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                      title="Auditar Parametrizacão e Custos"
                    >
                      <i className="fa-solid fa-sliders text-[11px]"></i>
                      <span>Auditar</span>
                    </button>
                    
                    <button 
                      onClick={() => handleVerFichaTecnica(eq)}
                      className="px-3 py-2 bg-green-800 hover:bg-green-700 text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs" 
                      title="Consultar Histórico Completo"
                    >
                      <i className="fa-solid fa-file-invoice text-[11px]"></i>
                      <span>Ficha Técnica</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* MODAL: FICHA TÉCNICA E GESTÃO EXPANDIDA */}
        <Modal
          isOpen={openFichaTecnica}
          onClose={() => setOpenFichaTecnica(false)}
          title={`Ficha Consolidada • ${equipamentoSelecionado?.codigo}`}
          icon="fa-solid fa-file-invoice"
        >
          <div className="bg-white p-2 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] bg-green-50 text-green-800 px-2.5 py-1 rounded font-black uppercase tracking-wider">
                  {equipamentoSelecionado?.categoria}
                </span>
                <h2 className="text-xl font-black text-green-900 mt-2 leading-tight">
                  {equipamentoSelecionado?.nome}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Investimento Acumulado</span>
                <span className="text-base font-mono font-black text-red-600">{equipamentoSelecionado?.custoAcumulado}</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Grid de Informações Estruturadas de Engenharia e Inventário */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Fabricante & Fornecedor</span>
                <span className="font-bold text-slate-700 block mt-1">{equipamentoSelecionado?.fabricante || "N/A"}</span>
              </div>

              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Modelo Registado</span>
                <span className="font-bold text-slate-700 block mt-1">{equipamentoSelecionado?.modelo || "N/A"}</span>
              </div>

              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Número de Série Técnico</span>
                <span className="font-mono font-bold text-slate-700 block mt-1 tracking-wide">{equipamentoSelecionado?.numeroSerie || "N/A"}</span>
              </div>

              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Expectativa de Vida Útil</span>
                <span className="font-bold text-slate-700 block mt-1">{equipamentoSelecionado?.vidaUtil || "N/A"}</span>
              </div>

              <div className="sm:col-span-2 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <i className="fa-solid fa-map-location-dot text-slate-400 text-base mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Localização Física Planta</span>
                  <span className="font-bold text-green-950 block mt-0.5">{equipamentoSelecionado?.localizacao || "Não parametrizada"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setOpenFichaTecnica(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-xl text-xs transition cursor-pointer"
              >
                Fechar Consulta
              </button>
            </div>
          </div>
        </Modal>

        {/* MODAL: AUDITORIA DO ATIVO (AÇÃO DO GESTOR) */}
        <Modal
          isOpen={openAuditoria}
          onClose={() => setOpenAuditoria(false)}
          title="Painel de Auditoria e Ajustes de Criticidade"
          icon="fa-solid fa-sliders"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              
              <div className="space-y-4">
                {/* Visualização de Resumo Financeiro/Tático */}
                <div className="p-3.5 bg-amber-50/40 border border-amber-100/60 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-amber-800 block">Equipamento em Análise</span>
                    <span className="font-black text-sm text-green-950">{equipamentoSelecionado?.nome}</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-1 rounded border border-amber-200 text-slate-600">
                    {equipamentoSelecionado?.codigo}
                  </span>
                </div>

                {/* Alteração do Nível de Criticidade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Nível de Criticidade Operacional (Matriz de Risco)
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      defaultValue={equipamentoSelecionado?.criticidade}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-bold text-slate-700 appearance-none cursor-pointer"
                    >
                      <option value="Média">Média (Não interrompe a planta principal)</option>
                      <option value="Alta">Alta (Gera estrangulamentos parciais no setor)</option>
                      <option value="Máxima">Máxima / Crítico (Paragem completa da produção)</option>
                    </select>
                  </div>
                </div>

                {/* Direcionamento de Orçamento Interno */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Centro de Alocação de Custos Primários
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-chart-pie absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-bold text-slate-700 appearance-none cursor-pointer">
                      <option>OPEX - Manutenção Preventiva Geral</option>
                      <option>CAPEX - Renovação de Ativos Fixo</option>
                      <option>Emergencial - Fundo de Avarias Críticas</option>
                    </select>
                  </div>
                </div>

                {/* Parecer do Auditor Técnico */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Despacho de Gestão / Parecer sobre Ciclo de Vida
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-gavel absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows="3"
                      placeholder="Introduza notas de auditoria interna (Ex: Equipamento com custos de reparo acima de 40% do valor de substituição. Sugerir renovação no próximo trimestre...)"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Envio para Atualizar Configurações */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  Salvar Parâmetros e Diretrizes do Ativo
                </button>
              </div>
            </form>
          </div>
        </Modal>

      </GestorLayout>
    </>
  );
}
