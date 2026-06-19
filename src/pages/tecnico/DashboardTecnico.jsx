import { useState } from "react";
import TecnicoLayout from "./components/TecnicoLayout";
import Modal from "./components/Modal";

export default function DashboardTecnico() {
  const [openNovaOcorrencia, setOpenNovaOcorrencia] = useState(false);

  // Métricas individuais focadas estritamente na rotina e execução do Técnico
  const stats = [
    {
      title: "Minhas Ordens Hoje",
      value: "3",
      icon: "fa-person-digging",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Manutenções Concluídas",
      value: "8",
      icon: "fa-circle-check",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Avarias Pendentes",
      value: "2",
      icon: "fa-triangle-exclamation",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Horas em Intervenção",
      value: "14.5 h",
      icon: "fa-clock",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <>
      <title>Técnico | EcoMaint</title>

      <TecnicoLayout title="Dashboard">
        <section className="space-y-8 animate-fade-in">
          
          {/* SAUDAÇÃO & CABEÇALHO DO TÉCNICO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-linear-to-r from-green-900 to-green-800 p-6 rounded-2xl shadow-xl shadow-green-950/10 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Olá, Gilberto José
              </h1>
              <p className="text-green-100/80 text-sm mt-1.5 font-medium">
                Consulte a sua escala diária, inicie ordens de serviço e registe anomalias encontradas nas instalações.
              </p>
            </div>

            <button
              onClick={() => setOpenNovaOcorrencia(true)}
              className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2.5 shadow-lg shadow-amber-500/10 self-start sm:self-auto"
            >
              <i className="fa-solid fa-circle-exclamation text-xs"></i>
              Reportar Ocorrência
            </button>
          </div>

          {/* CARDS DE ESTATÍSTICAS DO TÉCNICO */}
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

          {/* CONTEXTO OPERACIONAL EM FOCO */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Ordens de Trabalho Agendadas para o Próprio Técnico */}
            <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-green-900 text-base flex items-center gap-2">
                  <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                  Minhas Ordens de Trabalho (Hoje)
                </h2>
                <span className="text-slate-400 text-xs font-bold bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                  Próximas Tarefas
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { id: "ODT-4822", asset: "Gerador de Emergência #02", task: "Revisão preventiva e mudança de filtros", time: "14:00", level: "Alta Prioridade", labelColor: "bg-red-50 text-red-700" },
                  { id: "ODT-4825", asset: "Chiller Central Bloco B", task: "Substituição do pressostato de alta", time: "16:30", level: "Normal", labelColor: "bg-slate-50 text-slate-600" },
                  { id: "ODT-4831", asset: "Subestação PT-2", task: "Medição dos níveis de isolamento dielétrico", time: "Amanhã", level: "Rotina", labelColor: "bg-green-50 text-green-700" },
                ].map((odt) => (
                  <div
                    key={odt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50/70 hover:bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors text-sm gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-700 mt-1.5 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-green-950">{odt.asset}</span>
                          <span className="text-[10px] bg-white border border-slate-200 text-slate-500 px-1.5 py-px rounded font-bold">{odt.id}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{odt.task}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-slate-100/60">
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <i className="fa-regular fa-clock"></i> {odt.time}
                      </span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black ${odt.labelColor}`}>
                        {odt.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas Rápidos de Segurança / EPIs */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-black text-green-900 text-base mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-amber-500 rounded-full inline-block" />
                  Lembrete de Segurança
                </h2>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Antes de iniciar qualquer intervenção elétrica ou mecânica nas subestações, assegure-se de cumprir integralmente o procedimento **Lockout / Tagout (LOTO)**.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                  <i className="fa-solid fa-shield-halved"></i>
                  EPIs Obrigatórios Hoje:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Luvas Dielétricas", "Botas de Proteção", "Óculos", "Capacete"].map((epi, idx) => (
                    <span key={idx} className="bg-white/80 border border-amber-200/60 px-2 py-0.5 rounded text-[11px] text-amber-800 font-bold">
                      {epi}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL PARA REPORTAR OCORRÊNCIAS / ANOMALIAS NO TERRENO */}
        <Modal
          isOpen={openNovaOcorrencia}
          onClose={() => setOpenNovaOcorrencia(false)}
          title="Reportar Ocorrência / Anomalia"
          icon="fa-solid fa-circle-exclamation"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Equipamento Afetado */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Equipamento com Anomalia
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-gears absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Bomba Hidráulica Principal Bloco A"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Tipo de Falha Identificada */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Tipo de Falha
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-list absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      <option>Mecânica (Ruído / Vibração)</option>
                      <option>Elétrica (Curto / Sobrecarga)</option>
                      <option>Vazamento / Hidráulica</option>
                      <option>Instrumentação / Erro Digital</option>
                    </select>
                  </div>
                </div>

                {/* Estado Operacional do Ativo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Estado do Equipamento
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-ban absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      <option>A funcionar com restrições</option>
                      <option>Parado / Fora de Serviço</option>
                      <option>Risco iminente de quebra</option>
                    </select>
                  </div>
                </div>

                {/* Descrição Sintomática */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                    Descrição Detalhada do Sintoma
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-clipboard-list absolute left-4 top-4 text-slate-400 text-sm"></i>
                    <textarea
                      rows="3"
                      placeholder="Descreva o que observou (ex: aquecimento anormal acima de 85°C, fuga de óleo pelas juntas...)"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm resize-none"
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
                  Submeter Ocorrência para Triagem
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </TecnicoLayout>
    </>
  );
}
