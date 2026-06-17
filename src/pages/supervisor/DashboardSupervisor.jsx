import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SupervisorLayout from "./components/SupervisorLayout";
import Modal from "./components/Modal";

export default function DashboardSupervisor() {
  const [openNovaManutencao, setOpenNovaManutencao] = useState(false);

  const stats = [
    {
      title: "Equipamentos",
      value: "248",
      icon: "fa-gears",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Manutenções Pendentes",
      value: "16",
      icon: "fa-screwdriver-wrench",
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Ocorrências Abertas",
      value: "8",
      icon: "fa-triangle-exclamation",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Itens em Stock",
      value: "1.254",
      icon: "fa-boxes-stacked",
      color: "bg-blue-50 text-blue-600",
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
                Bem-vindo ao EcoMaint
              </h1>
              <p className="text-green-100/80 text-sm mt-1.5 font-medium">
                Visão geral e controlo em tempo real das operações de manutenção.
              </p>
            </div>

            <button
              onClick={() => setOpenNovaManutencao(true)}
              className="
                bg-amber-300
                hover:bg-amber-200
                active:scale-95
                text-green-950
                font-black
                text-sm
                py-3.5
                px-6
                rounded-xl
                transition-all
                duration-200
                cursor-pointer
                flex
                items-center
                gap-2.5
                shadow-lg
                shadow-amber-500/10
                self-start
                sm:self-auto
              "
            >
              <i className="fa-solid fa-plus text-xs"></i>
              Nova Manutenção
            </button>
          </div>

          {/* ESTATÍSTICAS EM CARD PREMIUM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.title}
                className="
                  bg-white
                  border border-slate-100
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-between
                  group
                "
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

          {/* INDICADORES & RESUMO */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Indicadores Operacionais */}
            <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Indicadores Operacionais
                </h2>
                <span className="p-2 bg-slate-50 text-slate-400 rounded-lg text-sm">
                  <i className="fa-solid fa-chart-line text-green-700"></i>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4 text-center sm:text-left">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Disponibilidade</p>
                  <h3 className="text-2xl font-black text-green-700 mt-2">97%</h3>
                </div>

                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4 text-center sm:text-left">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">MTTR (Reparação)</p>
                  <h3 className="text-2xl font-black text-amber-600 mt-2">3.2h</h3>
                </div>

                <div className="bg-linear-to-b from-slate-50 to-slate-100/50 border border-slate-100 rounded-xl p-4 text-center sm:text-left">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Preventivas</p>
                  <h3 className="text-2xl font-black text-blue-600 mt-2">84%</h3>
                </div>
              </div>
            </div>

            {/* Resumo Geral */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Resumo Geral
                </h2>
              </div>

              <div className="space-y-3.5">
                {[
                  { label: "Equipamentos ativos", val: "248", color: "text-green-700" },
                  { label: "Equipamentos inativos", val: "12", color: "text-red-500 font-extrabold" },
                  { label: "Técnicos Alocados", val: "18", color: "text-slate-700" },
                  { label: "Ordens Abertas", val: "7", color: "text-amber-500 font-extrabold" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 text-sm">
                    <span className="text-slate-500 font-medium">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRÓXIMAS MANUTENÇÕES + TIMELINE RECENTE */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Próximas Manutenções */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-green-900 text-base mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                Próximas Manutenções Planeadas
              </h2>

              <div className="space-y-2">
                {[
                  { name: "Gerador Principal", type: "Preventiva" },
                  { name: "Compressor Industrial", type: "Calibração" },
                  { name: "Painel Elétrico Geral", type: "Inspeção" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-slate-50 hover:bg-slate-100/70 p-3.5 rounded-xl transition-colors text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div>
                        <p className="font-bold text-slate-700">{item.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{item.type}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-black">
                      Amanhã
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividades Recentes com Timeline Real */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-green-900 text-base mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                Histórico de Atividades
              </h2>

              <div className="relative pl-4 border-l-2 border-slate-100 space-y-5 ml-2">
                {[
                  { text: "Nova ocorrência registada no Compressor A.", time: "Há 10 min", icon: "fa-circle-exclamation text-red-500 bg-red-50" },
                  { text: "Manutenção concluída no Elevador Hidráulico.", time: "Há 1 hora", icon: "fa-circle-check text-green-600 bg-green-50" },
                  { text: "Novo equipamento adicionado ao sistema.", time: "Há 3 horas", icon: "fa-circle-plus text-blue-600 bg-blue-50" },
                  { text: "Stock atualizado: Filtros de óleo recebidos.", time: "Ontem", icon: "fa-boxes-stacked text-slate-500 bg-slate-100" },
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start justify-between gap-4 text-sm group">
                    {/* Indicador customizado na linha */}
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

        {/* MODAL CONFIGURADO EM GRID (PREMIUM) */}
        <Modal
          isOpen={openNovaManutencao}
          onClose={() => setOpenNovaManutencao(false)}
          title="Nova Manutenção"
          icon="fa-solid fa-screwdriver-wrench"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              
              {/* Grid Responsiva de Inputs para evitar aspeto esticado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Equipamento */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Equipamento Alvo
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-gears absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Selecione o equipamento do inventário"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Tipo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Tipo de Intervenção
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-list absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
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
                    <i className="fa-solid fa-repeat absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Mensal, Semestral"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Responsável */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Técnico Responsável
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Nome do operador"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Data Inicial */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Agendamento Inicial
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-days absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

                {/* Checklist */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Procedimentos / Checklist de Tarefas
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-clipboard-check absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows="3"
                      placeholder="Indique as tarefas passo-a-passo (ex: 1. Verificar óleo, 2. Limpar filtros)..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Ações do Formulário */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  Confirmar e Criar Ordem
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </SupervisorLayout>
    </>
  );
}