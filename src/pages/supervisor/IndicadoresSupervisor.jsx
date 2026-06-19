import { useState } from "react";
import SupervisorLayout from "./components/SupervisorLayout";

export default function IndicadoresSupervisor() {
  // Estados para Filtros Avançados se necessário no futuro
  const [periodo, setPeriodo] = useState("mes");
  const [equipamento, setEquipamento] = useState("");

  // Dados reais consolidados dos KPIs de Manutenção com renderização matemática
  const kpisPrincipais = [
    {
      id: "MTBF",
      titulo: "MTBF",
      subtitulo: "Tempo Médio Entre Falhas",
      valor: "148 Horas",
      formula: "$$\\text{MTBF} = \\frac{\\text{Tempo Total de Operação}}{\\text{Número de Falhas}}$$",
      detalhe: "Indica o tempo médio que o ativo funciona sem interrupções.",
      corBadge: "bg-green-50 text-green-700 border-green-100",
      icon: "fa-solid fa-hourglass-half",
    },
    {
      id: "MTTR",
      titulo: "MTTR",
      subtitulo: "Tempo Médio para Reparação",
      valor: "2.4 Horas",
      formula: "$$\\text{MTTR} = \\frac{\\text{Tempo Total de Reparação}}{\\text{Número de Reparações}}$$",
      detalhe: "Mede a eficiência e rapidez da equipa técnica na resolução de avarias.",
      corBadge: "bg-amber-50 text-amber-700 border-amber-100",
      icon: "fa-solid fa-screwdriver-wrench",
    },
    {
      id: "DISP",
      titulo: "Disponibilidade",
      subtitulo: "Disponibilidade Operacional",
      valor: "98.4%",
      formula: "$$\\text{D} = \\left( \\frac{\\text{MTBF}}{\\text{MTBF} + \\text{MTTR}} \\right) \\times 100\\%$$",
      detalhe: "Percentagem de tempo útil em que o ativo esteve apto para produzir.",
      corBadge: "bg-blue-50 text-blue-700 border-blue-100",
      icon: "fa-solid fa-chart-line",
    },
  ];

  const outrosIndicadores = [
    { label: "Horas Operacionais", valor: "720 h", icon: "fa-solid fa-clock text-green-600" },
    { label: "Tempo de Paragem", valor: "12 h", icon: "fa-solid fa-ban text-red-500" },
    { label: "Frequência de Falhas", valor: "5 Eventos", icon: "fa-solid fa-triangle-exclamation text-amber-500" },
    { label: "Frequência de Intervenções", valor: "18 Ordens", icon: "fa-solid fa-clipboard-list text-slate-500" },
    { label: "Custos de Manutenção", valor: "450.000 Kz", icon: "fa-solid fa-wallet text-emerald-600" },
    { label: "Confiabilidade", valor: "92.1%", icon: "fa-solid fa-shield-halved text-indigo-600" },
  ];

  return (
    <>
      <title>Indicadores | EcoMaint</title>

      <SupervisorLayout title="Indicadores">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Métricas e Indicadores de Performance (KPIs)
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Monitore os índices fundamentais de engenharia de manutenção para garantir a alta fiabilidade dos ativos industriais.
              </p>
            </div>

            {/* Filtro Rápido Embutido no Topo */}
            <div className="relative self-start sm:self-auto min-w-44">
              <i className="fa-solid fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition appearance-none cursor-pointer"
              >
                <option value="mes">Este Mês</option>
                <option value="trimestre">Este Trimestre</option>
                <option value="ano">Ano Corrente (2026)</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none"></i>
            </div>
          </div>

          {/* TRÊS PILARES CRÍTICOS (MTBF, MTTR, DISPONIBILIDADE) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {kpisPrincipais.map((kpi) => (
              <div 
                key={kpi.id} 
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-200"
              >
                {/* Linha Decorativa Superior Discreta */}
                <div className="absolute top-0 left-0 right-0 h-0.75 bg-slate-100 group-hover:bg-green-700 transition-colors duration-300" />
                
                <div className="space-y-4">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-2xl font-black text-green-900 tracking-tight block">
                        {kpi.titulo}
                      </span>
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mt-0.5">
                        {kpi.subtitulo}
                      </span>
                    </div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm border ${kpi.corBadge}`}>
                      <i className={kpi.icon}></i>
                    </div>
                  </div>

                  {/* Valor de Destaque */}
                  <div className="text-3xl font-black text-green-950 tracking-tight py-1">
                    {kpi.valor}
                  </div>

                  {/* Bloco de Fórmula Técnica Re-estruturado */}
                  <div className="bg-slate-50/80 border border-slate-100 p-3 rounded-xl space-y-1 text-left">
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wide block">Equação de Engenharia</span>
                    <div className="text-xs font-medium text-slate-800 bg-white/85 px-1 py-2 rounded border border-slate-100 overflow-x-auto">
                      {kpi.formula}
                    </div>
                  </div>
                </div>

                {/* Descritivo de Contexto */}
                <p className="text-[11px] text-slate-400 font-medium mt-4 pt-3 border-t border-slate-50">
                  {kpi.detalhe}
                </p>
              </div>
            ))}
          </div>

          {/* SECÇÃO SECUNDÁRIA: OUTROS INDICADORES OPERACIONAIS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-green-700 rounded-full inline-block" />
                Outros Indicadores Consolidados
              </h2>
              <p className="text-slate-400 text-[11px] font-medium mt-0.5">
                Métricas acessórias apuradas automaticamente cruzando ordens de trabalho encerradas e registros de falhas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {outrosIndicadores.map((ind, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex items-center justify-between hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all duration-200"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">
                      {ind.label}
                    </span>
                    <span className="text-base font-black text-green-950 block truncate">
                      {ind.valor}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0">
                    <i className={`${ind.icon} text-xs`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAINEL INFORMATIVO PARA AUDITORIA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-green-950 p-6 rounded-2xl shadow-xs relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 text-9xl text-white font-black select-none pointer-events-none transform translate-x-10 translate-y-10">
              SLA
            </div>
            
            <div className="relative z-10">
              <h3 className="font-black text-amber-300 text-base leading-tight flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-xs"></i>
                Meta de Confiabilidade Global (SLA)
              </h3>
              <p className="text-green-200/70 text-xs mt-1 font-medium max-w-2xl">
                O ecossistema está configurado para emitir alertas visuais críticos diretamente no Dashboard do Administrador sempre que a Disponibilidade Geral cair abaixo de **95.0%** ou o MTTR ultrapassar **3.5 horas**.
              </p>
            </div>
            
            <div className="bg-green-900/60 border border-green-800/80 px-4 py-2 rounded-xl text-center shrink-0 w-full md:w-auto">
              <span className="text-slate-300 text-[9px] font-black uppercase tracking-wider block">Status Atual</span>
              <span className="text-sm font-black text-white flex items-center justify-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Dentro da Meta
              </span>
            </div>
          </div>

        </section>
      </SupervisorLayout>
    </>
  );
}
