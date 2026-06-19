import { useState } from "react";
import TecnicoLayout from "./components/TecnicoLayout";

export default function NotificacoesTecnico() {
  // Dados focados estritamente na rotina e nas ordens de trabalho do Técnico
  const [notificacoes, setNotificacoes] = useState([
    {
      id: "ALR-001",
      tipo: "Ordem de Serviço Urgente",
      mensagem: "Foi-lhe atribuída a OS-8842 para reparação imediata do Painel de Distribuição Geral no Bloco C.",
      data: "Hoje, 11:15",
      lida: false,
      severidade: "critico",
    },
    {
      id: "ALR-002",
      tipo: "Manutenção Atrasada",
      mensagem: "O Compressor Industrial B3 está com o plano de revisão preventiva fora do prazo.",
      data: "Hoje, 08:30",
      lida: false,
      severidade: "critico",
    },
    {
      id: "ALR-003",
      tipo: "Preventiva Agendada",
      mensagem: "Revisão sistemática do Gerador Elétrico Principal mapeada para a sua escala nas próximas 24 horas.",
      data: "Ontem, 16:45",
      lida: true,
      severidade: "info",
    },
    {
      id: "ALR-004",
      tipo: "Anomalia Registada",
      mensagem: "O seu reporte de avaria no sistema sobre a Bomba Hidráulica foi validado pela Supervisão.",
      data: "Ontem, 14:20",
      lida: true,
      severidade: "sucesso",
    },
  ]);

  // Configuração visual focada na ação do operador em campo
  const getAlertaConfig = (tipo) => {
    switch (tipo) {
      case "Ordem de Serviço Urgente":
        return { 
          bg: "bg-red-50 text-red-700 border-red-100", 
          icone: "fa-solid fa-file-signature",
          acaoTexto: "Executar OS"
        };
      case "Manutenção Atrasada":
        return { 
          bg: "bg-amber-50 text-amber-700 border-amber-100", 
          icone: "fa-solid fa-triangle-exclamation",
          acaoTexto: "Abrir Diagnóstico"
        };
      case "Preventiva Agendada":
        return { 
          bg: "bg-green-50 text-green-700 border-green-100", 
          icone: "fa-solid fa-calendar-check",
          acaoTexto: "Iniciar Rotina" 
        };
      case "Anomalia Registada":
        return { 
          bg: "bg-blue-50 text-blue-700 border-blue-100", 
          icone: "fa-solid fa-clipboard-check",
          acaoTexto: "Ver Histórico" 
        };
      default:
        return { 
          bg: "bg-slate-50 text-slate-700 border-slate-100", 
          icone: "fa-solid fa-bell",
          acaoTexto: "Ver Detalhes" 
        };
    }
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })));
  };

  const marcarComoLida = (id) => {
    setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const totalNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <>
      <title>Notificações | EcoMaint</title>

      <TecnicoLayout title="Notificações">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                O Meu Painel de Alertas
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Consulte ordens de serviço atribuídas, alterações de escala e avisos urgentes sobre os ativos sob a sua responsabilidade.
              </p>
            </div>

            {totalNaoLidas > 0 && (
              <button
                onClick={marcarTodasComoLidas}
                className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
              >
                <i className="fa-solid fa-check-double text-[10px]"></i>
                Limpar Notificações
              </button>
            )}
          </div>

          {/* FILTRO E RESUMO RÁPIDO */}
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md tracking-wide border border-slate-100">
                Atualizações Operacionais
              </span>
            </div>
            <div>
              Alertas Pendentes: <span className="text-green-900 ml-1 font-black">{totalNaoLidas} por ler</span>
            </div>
          </div>

          {/* LISTA DE NOTIFICAÇÕES (FEED ELEGANTE) */}
          <div className="space-y-3">
            {notificacoes.map((item) => {
              const config = getAlertaConfig(item.tipo);
              return (
                <div
                  key={item.id}
                  onClick={() => marcarComoLida(item.id)}
                  className={`bg-white border rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden cursor-pointer ${
                    !item.lida 
                      ? "border-l-4 border-l-green-700 border-slate-100 bg-green-50/5 hover:bg-green-50/10" 
                      : "border-slate-100 opacity-85 hover:opacity-100 hover:bg-slate-50/40"
                  }`}
                >
                  {/* Bloco do Ícone e Mensagem */}
                  <div className="flex gap-4 items-start flex-1 min-w-0">
                    {/* Badge Circular do Ícone */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border text-sm ${config.bg}`}>
                      <i className={config.icone}></i>
                    </div>

                    {/* Texto Informativo */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-green-900">
                          {item.tipo}
                        </span>
                        {!item.lida && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" title="Nova Notificação" />
                        )}
                      </div>
                      <p className="text-slate-600 text-xs font-medium leading-relaxed wrap-break-word">
                        {item.mensagem}
                      </p>
                    </div>
                  </div>

                  {/* Bloco Lateral de Interação e Data */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 md:pl-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                    <div className="flex items-center md:items-end gap-2 text-[11px] font-bold text-slate-400">
                      <span className="bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded text-[10px] border border-slate-100">
                        {item.id}
                      </span>
                      <span className="flex items-center gap-1 font-medium whitespace-nowrap">
                        <i className="fa-regular fa-clock text-[10px]"></i>
                        {item.data}
                      </span>
                    </div>

                    {/* Botão de Ação Rápida de Campo */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Evita re-trigger de leitura
                        marcarComoLida(item.id);
                        // Integrar roteamento da app para a OS correspondente futuramente
                      }}
                      className="text-[11px] font-black bg-slate-100 hover:bg-green-800 hover:text-white text-slate-700 px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer whitespace-nowrap"
                    >
                      {config.acaoTexto}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      </TecnicoLayout>
    </>
  );
}
