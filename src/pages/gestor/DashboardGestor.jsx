import { useState } from "react";
import GestorLayout from "./components/GestorLayout";
import Modal from "./components/Modal";

export default function DashboardGestor() {
  const [openNovaOcorrencia, setOpenNovaOcorrencia] = useState(false);

  // Indicadores de Alta Performance (KPIs) voltados à Gestão de Ativos e Custos
  const stats = [
    {
      title: "Disponibilidade Global",
      value: "94.2%",
      icon: "fa-chart-line",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Conformidade de PM",
      value: "87.5%",
      icon: "fa-ビジネス-time fa-calendar-check", // Ícone de agenda/cumprimento
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Custos de Manutenção",
      value: "1.4M Kz",
      icon: "fa-wallet",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Tempo Médio Reparo (MTTR)",
      value: "2.1 h",
      icon: "fa-hourglass-half",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <>
      <title>Gestor | EcoMaint</title>

      <GestorLayout title="Dashboard">
        <section className="space-y-8 animate-fade-in">
          
          {/* SAUDAÇÃO & VISÃO MACRO DO GESTOR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-linear-to-r from-green-900 to-green-800 p-6 rounded-2xl shadow-xl shadow-green-950/10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Painel de Gestão Operacional
              </h1>
              <p className="text-green-100/80 text-sm mt-1.5 font-medium">
                Bem-vindo ao centro de controlo técnico. Monitorize índices de criticidade, custos acumulados do mês e relatórios de triagem.
              </p>
            </div>

            <button
              onClick={() => setOpenNovaOcorrencia(true)}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-lg shadow-amber-500/10 self-start sm:self-auto"
            >
              <i className="fa-solid fa-file-invoice-dollar text-xs"></i>
              Aprovar Despesa / Ordem
            </button>
          </div>

          {/* ESTATÍSTICAS E KPIS DE GESTÃO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                    {item.title}
                  </p>
                  <h3 className="text-3xl font-black text-green-900 tracking-tight">
                    {item.value}
                  </h3>
                </div>

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner ${item.color}`}>
                  <i className={`fa-solid ${item.icon} text-lg`}></i>
                </div>
              </div>
            ))}
          </div>

          {/* PAINÉIS DE ANÁLISE DE EQUIPAMENTOS E RELATÓRIOS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Estado Crítico de Equipamentos da Planta */}
            <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Ativos Sob Alerta Operacional
                </h2>
                <span className="text-slate-400 text-xs font-bold bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                  Módulo de Equipamentos
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { id: "EQP-902", asset: "Chiller Central Bloco B", status: "Parado por Avaria", metric: "MTBF: 120h", impact: "Alto Impacto", labelColor: "bg-red-50 text-red-700" },
                  { id: "EQP-411", asset: "Gerador de Emergência Caterpillar", status: "Manutenção Preventiva", metric: "Conclusão: 72%", impact: "Planeado", labelColor: "bg-blue-50 text-blue-700" },
                  { id: "EQP-108", asset: "Bomba Hidráulica de Sucção N3", status: "Operação com Restrições", metric: "Eficiência: 68%", impact: "Médio Impacto", labelColor: "bg-amber-50 text-amber-700" },
                ].map((eqp) => (
                  <div
                    key={eqp.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/70 hover:bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors text-sm gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-700 mt-1.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-green-950">{eqp.asset}</span>
                          <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-px rounded font-bold">{eqp.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{eqp.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-slate-100/60">
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-gauge-high"></i> {eqp.metric}
                      </span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black ${eqp.labelColor}`}>
                        {eqp.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo de Indicadores & Relatórios Pendentes */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-black text-green-900 text-base mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-amber-500 rounded-full inline-block" />
                  Relatórios Mensais
                </h2>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Consulte os ficheiros consolidados gerados pela engenharia referentes à auditoria técnica interna e custos parciais deste ciclo.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-green-900">
                  <i className="fa-solid fa-file-pdf text-red-600"></i>
                  Documentos para Revisão:
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    "Relatório de Emissões & Sustentabilidade",
                    "Análise de Custos de Peças (Maio)",
                    "Inventário Geral de Ativos Industriais"
                  ].map((doc, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/60 p-2 rounded text-[11px] text-slate-700 font-bold flex items-center justify-between hover:bg-slate-100/50 transition cursor-pointer">
                      <span className="truncate max-w-44">{doc}</span>
                      <i className="fa-solid fa-download text-slate-400 hover:text-green-800"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* MODAL AJUSTADO PARA SUBMISSÃO DE PEDIDO DE COMPRA / ORÇAMENTO DE REPARO */}
        <Modal
          isOpen={openNovaOcorrencia}
          onClose={() => setOpenNovaOcorrencia(false)}
          title="Aprovação de Orçamentos & Ordens Críticas"
          icon="fa-solid fa-file-invoice-dollar"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Referência da Ordem */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Ordem de Trabalho Associada
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-hashtag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: ODT-4822 - Chiller Central Bloco B"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-semibold text-slate-700"
                    />
                  </div>
                </div>

                {/* Centro de Custo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Centro de Custo / Unidade
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-semibold text-slate-700 appearance-none cursor-pointer">
                      <option>Infraestrutura e Utilidades</option>
                      <option>Produção Industrial - Linha A</option>
                      <option>Logística e Frotas</option>
                    </select>
                  </div>
                </div>

                {/* Teto de Verba Alocado */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Valor Estimado (Aprovação)
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-money-bill-wave absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: 450.000,00 Kz"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-bold text-slate-700"
                    />
                  </div>
                </div>

                {/* Nota de Justificação */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Parecer de Gestão / Observações
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-comment-dots absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows="3"
                      placeholder="Adicione notas de cabimentação orçamental ou prazos críticos de faturamento para os fornecedores..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none font-medium text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Envio para a Supervisão */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  Liberar Orçamentação Técnica
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </GestorLayout>
    </>
  );
}
