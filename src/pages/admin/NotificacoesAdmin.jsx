import { useState } from "react";
import AdminLayout from "./components/AdminLayout";

export default function NotificacoesAdmin() {
  // Dados fictícios baseados estritamente nos tipos de alertas solicitados
  const [notificacoes, setNotificacoes] = useState([
    {
      id: "NOT-001",
      tipo: "Manutenção atrasada",
      mensagem: "A caldeira industrial do Bloco B falhou o prazo de inspeção programada.",
      data: "Hoje, 09:15",
      lida: false,
      severidade: "critico", // critico, aviso, info
    },
    {
      id: "NOT-002",
      tipo: "Stock crítico",
      mensagem: "O stock de Rolamentos Blindados atingiu o limite mínimo de segurança (2 unidades restantes).",
      data: "Hoje, 08:30",
      lida: false,
      severidade: "critico",
    },
    {
      id: "NOT-003",
      tipo: "Nova ocorrência",
      mensagem: "O técnico António Mateus reportou uma anomalia na bomba hidráulica principal.",
      data: "Ontem, 16:45",
      lida: true,
      severidade: "aviso",
    },
    {
      id: "NOT-004",
      tipo: "Nova ordem de serviço",
      mensagem: "A OS-8842 foi gerada automaticamente e atribuída à equipa de eletromecânica.",
      data: "Ontem, 14:20",
      lida: true,
      severidade: "info",
    },
    {
      id: "NOT-005",
      tipo: "Manutenção próxima",
      mensagem: "Revisão preventiva do Gerador de Emergência agendada para daqui a 48 horas.",
      data: "08 Jun, 11:00",
      lida: true,
      severidade: "info",
    },
  ]);

  // Função auxiliar para injetar as cores e os ícones corretos de forma limpa
  const getAlertaEstilo = (tipo) => {
    switch (tipo) {
      case "Manutenção atrasada":
        return { bg: "bg-red-50 text-red-700 border-red-100", icone: "fa-solid fa-triangle-exclamation" };
      case "Stock crítico":
        return { bg: "bg-amber-50 text-amber-700 border-amber-100", icone: "fa-solid fa-boxes-stacked" };
      case "Nova ocorrência":
        return { bg: "bg-orange-50 text-orange-700 border-orange-100", icone: "fa-solid fa-circle-exclamation" };
      case "Nova ordem de serviço":
        return { bg: "bg-blue-50 text-blue-700 border-blue-100", icone: "fa-solid fa-file-signature" };
      case "Manutenção próxima":
        return { bg: "bg-green-50 text-green-700 border-green-100", icone: "fa-solid fa-calendar-check" };
      default:
        return { bg: "bg-slate-50 text-slate-700 border-slate-100", icone: "fa-solid fa-bell" };
    }
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };

  const totalNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <>
      <title>Notificações | EcoMaint</title>

      <AdminLayout title="Notificações">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Centro de Alertas e Notificações
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Monitore os incidentes em tempo real, rotinas de manutenção preventiva e o estado dos ativos críticos do ecossistema.
              </p>
            </div>

            {totalNaoLidas > 0 && (
              <button
                onClick={marcarTodasComoLidas}
                className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
              >
                <i className="fa-solid fa-check-double text-[10px]"></i>
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* FILTRO E RESUMO RÁPIDO */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md tracking-wide">
                Histórico Recente
              </span>
            </div>
            <div>
              Pendentes: <span className="text-green-900 ml-1 font-black">{totalNaoLidas} Não lidas</span>
            </div>
          </div>

          {/* LISTA DE NOTIFICAÇÕES (FEED ELEGANTE) */}
          <div className="space-y-3">
            {notificacoes.map((item) => {
              const estilo = getAlertaEstilo(item.tipo);
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative overflow-hidden ${
                    !item.lida ? "border-l-4 border-l-green-700 border-slate-100 bg-green-50/5" : "border-slate-100 opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Bloco do Ícone e Mensagem */}
                  <div className="flex gap-4 items-start flex-1">
                    {/* Badge Circular do Ícone */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-sm ${estilo.bg}`}>
                      <i className={estilo.icone}></i>
                    </div>

                    {/* Texto Informativo */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-green-900">
                          {item.tipo}
                        </span>
                        {!item.lida && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" title="Nova Notificação" />
                        )}
                      </div>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed">
                        {item.mensagem}
                      </p>
                    </div>
                  </div>

                  {/* Bloco de Data e Identificador */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 sm:pl-4 text-[11px] font-bold text-slate-400 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                    <span className="bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded text-[10px]">
                      {item.id}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <i className="fa-regular fa-clock text-[10px]"></i>
                      {item.data}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      </AdminLayout>
    </>
  );
}