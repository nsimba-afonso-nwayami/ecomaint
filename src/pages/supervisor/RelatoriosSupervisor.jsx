import { useState } from "react";
import SupervisorLayout from "./components/SupervisorLayout";
import ModalSmall from "./components/ModalSmall";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

// Dados alinhados aos relatórios industriais solicitados
const dadosFalhas = [
  { name: "Ar Condicionado", falhas: 4 },
  { name: "Gerador 01", falhas: 7 },
  { name: "Elevador Principal", falhas: 2 },
  { name: "Bomba de Água", falhas: 5 },
];

const dadosCustos = [
  { mes: "Jan", pecas: 140000, maoDeObra: 80000, total: 220000 },
  { mes: "Fev", pecas: 210000, maoDeObra: 120000, total: 330000 },
  { mes: "Mar", pecas: 90000, maoDeObra: 60000, total: 150000 },
  { mes: "Abr", pecas: 350000, maoDeObra: 180000, total: 530000 },
];

const dadosManutencao = [
  { name: "Preventiva", value: 65, color: "#22c55e" }, // green-500
  { name: "Corretiva", value: 35, color: "#f59e0b" },  // amber-500
];

export default function RelatoriosSupervisor() {
  // Estados para Filtros
  const [periodo, setPeriodo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [equipamento, setEquipamento] = useState("");

  // Estados de Exportação
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState("");

  const handleExport = (type) => {
    setExportType(type);
    setIsExportModalOpen(true);
  };

  return (
    <>
      <title>Relatórios | EcoMaint</title>

      <SupervisorLayout title="Relatórios">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Painel Estatístico e Relatórios
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Consulte indicadores de avarias, eficiência das manutenções, balanço de custos operacionais e faça exportações rápidas.
              </p>
            </div>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            {/* Filtro Período */}
            <div className="relative">
              <i className="fa-regular fa-calendar absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Qualquer Período</option>
                <option value="mes">Este Mês</option>
                <option value="last-30">Últimos 30 dias</option>
                <option value="year">Este Ano</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            {/* Filtro Departamento */}
            <div className="relative">
              <i className="fa-solid fa-building absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Departamentos</option>
                <option value="producao">Produção</option>
                <option value="infra">Infraestrutura</option>
                <option value="logistica">Logística</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>

            {/* Filtro Equipamento */}
            <div className="relative">
              <i className="fa-solid fa-gears absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
              <select
                value={equipamento}
                onChange={(e) => setEquipamento(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-bold text-slate-600 appearance-none cursor-pointer"
              >
                <option value="">Todos os Equipamentos</option>
                <option value="gerador">Gerador Elétrico Principal</option>
                <option value="compressor">Compressor Industrial B3</option>
                <option value="painel">Painel de Distribuição Geral</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
            </div>
          </div>

          {/* GRÁFICOS PRINCIPAIS: FALHAS E MANUTENÇÃO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Relatório de Falhas */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-black text-green-900 text-sm leading-tight flex items-center gap-2 mb-4">
                  <span className="w-1 h-3 bg-green-700 rounded-full inline-block" />
                  Relatório de Falhas por Equipamento
                </h3>
                <div className="h-64 w-full text-xs font-semibold">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dadosFalhas}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Legend />
                      <Bar dataKey="falhas" name="Ocorrências / Falhas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Relatório de Manutenção */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-black text-green-900 text-sm leading-tight flex items-center gap-2 mb-4">
                  <span className="w-1 h-3 bg-green-700 rounded-full inline-block" />
                  Tipos de Manutenção Aplicada
                </h3>
                <div className="h-52 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosManutencao}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {dadosManutencao.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: '700' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                <div>Preventiva: <span className="text-green-600 font-black block text-base mt-0.5">65%</span></div>
                <div>Corretiva: <span className="text-amber-500 font-black block text-base mt-0.5">35%</span></div>
              </div>
            </div>

          </div>

          {/* RELATÓRIO DE CUSTOS ACUMULADOS */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
            <h3 className="font-black text-green-900 text-sm leading-tight flex items-center gap-2 mb-4">
              <span className="w-1 h-3 bg-green-700 rounded-full inline-block" />
              Relatório Geral de Custos Acumulados (AOA)
            </h3>
            <div className="h-72 w-full text-xs font-semibold">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosCustos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="mes" stroke="#94a3b8" tickLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pecas" name="Peças Aplicadas" stroke="#94a3b8" strokeWidth={2} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="maoDeObra" name="Mão de Obra" stroke="#cbd5e1" strokeWidth={2} />
                  <Line type="monotone" dataKey="total" name="Total (Kz)" stroke="#16a34a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PAINEL DE EXPORTAÇÃO */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h3 className="font-black text-green-900 text-base leading-tight flex items-center gap-2">
                <span className="w-1 h-4 bg-green-700 rounded-full inline-block" />
                Exportação de Relatórios Otimizados
              </h3>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Descarregue imediatamente as tabelas de auditoria filtradas e métricas prontas para submissão da gerência.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => handleExport("PDF")}
                className="flex-1 md:flex-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-file-pdf text-red-500"></i>
                Exportar PDF
              </button>
              <button 
                onClick={() => handleExport("Excel")}
                className="flex-1 md:flex-none bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-file-excel text-green-600"></i>
                Exportar Excel
              </button>
              <button 
                onClick={() => handleExport("CSV")}
                className="flex-1 md:flex-none bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-xs py-3 px-5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-500/5"
              >
                <i className="fa-solid fa-file-csv"></i>
                Exportar CSV
              </button>
            </div>
          </div>

        </section>
      </SupervisorLayout>

      {/* MODAL SMALL AJUSTADO COM ASSINATURA CORRETA */}
      <ModalSmall
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="A Gerar Documentação"
        icon="fa-solid fa-circle-notch"
      >
        <div className="p-1 space-y-4 text-center">
          <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto text-lg">
            <i className="fa-solid fa-spinner animate-spin"></i>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            O arquivo estruturado em formato <span className="font-black text-green-700">{exportType}</span> está a ser compilado com os dados e métricas atuais. O download iniciará de forma automática.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs transition cursor-pointer"
            >
              Fechar Janela
            </button>
          </div>
        </div>
      </ModalSmall>
    </>
  );
}
