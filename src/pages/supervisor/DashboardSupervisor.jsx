import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SupervisorLayout from "./components/SupervisorLayout";
import Modal from "./components/Modal";

export default function DashboardSupervisor() {
  const [openNovaManutencao, setOpenNovaManutencao] = useState(false);

  // Métricas focadas em Operação e Gestão de Equipas (Foco do Supervisor)
  const stats = [
    {
      title: "Ordens em Curso",
      value: "12",
      icon: "fa-person-digging",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Manutenções Atrasadas",
      value: "4",
      icon: "fa-clock",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Técnicos Ativos",
      value: "14/18",
      icon: "fa-users-gears",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Aprovações Pendentes",
      value: "3",
      icon: "fa-file-signature",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <>
      <title>Supervisor | EcoMaint</title>

      <SupervisorLayout title="Início">
        <section className="space-y-8 animate-fade-in">
          
          {/* SAUDAÇÃO & CABEÇALHO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-linear-to-r from-green-900 to-green-800 p-6 rounded-2xl shadow-xl shadow-green-950/10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Painel de Supervisão
              </h1>
              <p className="text-green-100/80 text-sm mt-1.5 font-medium">
                Gestão direta de equipas, distribuição de ordens e controlo de execução técnica.
              </p>
            </div>

            <button
              onClick={() => setOpenNovaManutencao(true)}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-lg shadow-amber-500/10 self-start sm:self-auto"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              Atribuir Ordem (ODT)
            </button>
          </div>

          {/* CARDS DE ESTATÍSTICAS RE-ADAPTADOS */}
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

          {/* CONTROLOS DE EQUIPA & ESTADO DA ESCALA */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Estado de Alocação de Técnicos */}
            <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Alocação de Técnicos em Tempo Real
                </h2>
                <span className="p-2 bg-slate-50 text-slate-400 rounded-lg text-sm">
                  <i className="fa-solid fa-users text-green-700"></i>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Equipa Mecânica</p>
                  <h3 className="text-2xl font-black text-green-700 mt-2">6 Ativos</h3>
                  <p className="text-[11px] text-slate-400 mt-1">Nenhum disponível</p>
                </div>

                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Equipa Elétrica</p>
                  <h3 className="text-2xl font-black text-green-700 mt-2">5 Ativos</h3>
                  <p className="text-[11px] text-amber-600 mt-1">2 Disponíveis no piquete</p>
                </div>

                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Ar Condicionado / AVAC</p>
                  <h3 className="text-2xl font-black text-slate-400 mt-2">3 Ativos</h3>
                  <p className="text-[11px] text-slate-400 mt-1">2 de folga</p>
                </div>
              </div>
            </div>

            {/* Resumo Operacional do Dia */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Resumo das ODTs (Hoje)
                </h2>
              </div>

              <div className="space-y-3.5">
                {[
                  { label: "Ordens Planeadas", val: "18", color: "text-slate-700" },
                  { label: "Executadas com sucesso", val: "9", color: "text-green-700" },
                  { label: "Paradas por falta de peça", val: "2", color: "text-red-500 font-extrabold" },
                  { label: "Pedidos urgentes triados", val: "5", color: "text-amber-500 font-extrabold" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 text-sm">
                    <span className="text-slate-500 font-medium">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MONITORIZAÇÃO DIRECTA */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Próximas Intervenções Críticas */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-green-900 text-base mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                Intervenções Críticas Sob Minha Alçada
              </h2>

              <div className="space-y-2">
                {[
                  { name: "Subestação PT-2", desc: "Verificação dos níveis de isolamento", tech: "Téc. Mateus Francisco" },
                  { name: "Chiller Central Bloco B", desc: "Substituição do pressostato de alta", tech: "Téc. Carlos Silva" },
                  { name: "Bomba de Água Residual", desc: "Manutenção corretiva urgente", tech: "Equipa B (Mecânica)" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50 hover:bg-slate-100/70 p-3.5 rounded-xl transition-colors text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div>
                        <p className="font-bold text-slate-700">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{item.desc} • <span className="text-green-800 font-semibold">{item.tech}</span></p>
                      </div>
                    </div>
                    <span className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full font-black">
                      Alta Prioridade
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividades Recentes do Turno */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-green-900 text-base mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                Registo de Atividades do Turno
              </h2>

              <div className="relative pl-4 border-l-2 border-slate-100 space-y-5 ml-2">
                {[
                  { text: "Téc. Carlos Silva iniciou a ODT #482 (Gerador 02).", time: "Há 5 min" },
                  { text: "ODT #479 dada como concluída por Téc. Mateus Francisco.", time: "Há 42 min" },
                  { text: "Pedido de validação de fecho de manutenção recebido do Elevador 01.", time: "Há 1 hora" },
                  { text: "Relatório de avaria submetido pelo operador da Linha de Produção 3.", time: "Há 2 horas" },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start justify-between gap-4 text-sm group">
                    <div className="absolute -left-6.25 top-0.5 bg-white p-0.5 rounded-full">
                      <div className="w-3 h-3 rounded-full bg-green-700 border-2 border-white shadow-sm group-hover:scale-120 transition-transform" />
                    </div>

                    <div>
                      <p className="text-slate-600 font-medium">{item.text}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODAL AJUSTADO PARA EMISSÃO/ATRIBUIÇÃO DE ORDENS PELO SUPERVISOR */}
        <Modal
          isOpen={openNovaManutencao}
          onClose={() => setOpenNovaManutencao(false)}
          title="Atribuir Ordem de Trabalho (ODT)"
          icon="fa-solid fa-file-signature"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Seleção do Equipamento */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Equipamento / Sistema Afetado
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-gears absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Compressor de Ar Comprimido #03"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Tipo de Manutenção */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Tipo de ODT
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-list absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      <option>Preventiva Planeada</option>
                      <option>Corretiva Urgente</option>
                      <option>Calibração / Ensaio</option>
                    </select>
                  </div>
                </div>

                {/* Técnico Atribuído */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Técnico / Equipa Alocada
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user-gear absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      <option>Téc. Carlos Silva (Elétrica)</option>
                      <option>Téc. Mateus Francisco (Mecânica)</option>
                      <option>Piquete de Turno Geral</option>
                    </select>
                  </div>
                </div>

                {/* Nível de Criticidade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Criticidade / Prioridade
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-triangle-exclamation absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      <option>Baixa - Rotina</option>
                      <option>Média - Agendada</option>
                      <option>Alta - Paragem iminente</option>
                    </select>
                  </div>
                </div>

                {/* Prazo Limite */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Prazo Limite de Execução
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

                {/* Notas de Orientação Técnica */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Instruções de Trabalho Específicas
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-clipboard-list absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows="3"
                      placeholder="Descreve os sintomas reportados ou os passos críticos que o técnico precisa de validar no local..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Disparo */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  Despachar para o Técnico
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </SupervisorLayout>
    </>
  );
}
