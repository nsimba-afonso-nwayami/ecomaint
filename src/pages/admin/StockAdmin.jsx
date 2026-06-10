import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import ModalSmall from "./components/ModalSmall";

export default function StockAdmin() {
  const [openNovoMaterial, setOpenNovoMaterial] = useState(false);
  const [openNovaEntrada, setOpenNovaEntrada] = useState(false);
  const [openNovaSaida, setOpenNovaSaida] = useState(false);
  const [openExcluirMaterial, setOpenExcluirMaterial] = useState(false);
  
  const [modoEdicao, setModoEdicao] = useState(false);
  const [materialSelecionado, setMaterialSelecionado] = useState(null);

  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [filtroAlerta, setFiltroAlerta] = useState(""); // Filtro para "Crítico" ou "Esgotado"

  // Dados mockados baseados nos campos solicitados
  const materiais = [
    {
      codigo: "MAT-010",
      descricao: "Filtro de Ar Industrial HEPA",
      categoria: "Consumíveis",
      quantidade: 2,
      stockMinimo: 5,
      localização: "Armazém A - Prateleira 3",
      estadoStock: "Crítico", // quantidade <= stockMinimo
    },
    {
      codigo: "MAT-022",
      descricao: "Óleo Lubrificante Sintético 5W40 (1L)",
      categoria: "Lubrificantes",
      quantidade: 15,
      stockMinimo: 10,
      localização: "Armazém B - Setor Líquidos",
      estadoStock: "Normal",
    },
    {
      codigo: "MAT-045",
      descricao: "Válvula de Pressão Pneumática 1/2",
      categoria: "Peças de Reposição",
      quantidade: 0,
      stockMinimo: 3,
      localização: "Armazém A - Gaveta 12",
      estadoStock: "Esgotado", // quantidade === 0
    },
  ];

  // Contadores para os Alertas baseados na lista total original
  const totalCritico = materiais.filter(m => m.estadoStock === "Crítico").length;
  const totalEsgotado = materiais.filter(m => m.estadoStock === "Esgotado").length;

  // Filtragem Dinâmica da Listagem
  const materiaisFiltrados = materiais.filter((mat) => {
    const matchesPesquisa =
      mat.codigo.toLowerCase().includes(filtroPesquisa.toLowerCase()) ||
      mat.descricao.toLowerCase().includes(filtroPesquisa.toLowerCase());

    const matchesAlerta = filtroAlerta ? mat.estadoStock === "filtroAlerta" || mat.estadoStock === filtroAlerta : true;

    return matchesPesquisa && matchesAlerta;
  });

  const handleNovoMaterial = () => {
    setMaterialSelecionado(null);
    setModoEdicao(false);
    setOpenNovoMaterial(true);
  };

  const handleEditarMaterial = (mat) => {
    setMaterialSelecionado(mat);
    setModoEdicao(true);
    setOpenNovoMaterial(true);
  };

  const handleExcluirMaterial = (mat) => {
    setMaterialSelecionado(mat);
    setOpenExcluirMaterial(true);
  };

  return (
    <>
      <title>Stock | EcoMaint</title>

      <AdminLayout title="Stock">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO COM MÚLTIPLAS AÇÕES */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Controlo de Stock e Inventário
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Gerencie peças de reposição, consumíveis, registe fluxos de entrada e saídas por ordens de serviço.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Entrada de Stock */}
              <button
                onClick={() => setOpenNovaNovaEntrada(true)}
                className="bg-green-50 hover:bg-green-100 text-green-800 font-bold text-xs py-3 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-green-200/50"
              >
                <i className="fa-solid fa-arrow-down-long"></i>
                Registar Entrada
              </button>

              {/* Saída de Stock */}
              <button
                onClick={() => setOpenNovaSaida(true)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-slate-200/50"
              >
                <i className="fa-solid fa-arrow-up-long"></i>
                Registar Saída
              </button>

              {/* Cadastrar Material */}
              <button
                onClick={handleNovoMaterial}
                className="bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-xs py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/5"
              >
                <i className="fa-solid fa-plus"></i>
                Novo Material
              </button>
            </div>
          </div>

          {/* PAINEL DE ALERTAS DE STOCK CRÍTICO / ESGOTADO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Alerta Esgotado */}
            <div 
              onClick={() => setFiltroAlerta(filtroAlerta === "Esgotado" ? "" : "Esgotado")}
              className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                filtroAlerta === "Esgotado" 
                  ? "bg-red-500 border-red-600 text-white shadow-md shadow-red-500/10" 
                  : "bg-red-50/50 border-red-100 text-red-900 hover:bg-red-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${filtroAlerta === "Esgotado" ? "bg-white/20" : "bg-red-100 text-red-600"}`}>
                <i className="fa-solid fa-circle-xmark"></i>
              </div>
              <div>
                <span className={`text-[10px] uppercase font-black tracking-wider ${filtroAlerta === "Esgotado" ? "text-red-100" : "text-red-400"}`}>Stock Esgotado</span>
                <h4 className="text-lg font-black leading-tight">{totalEsgotado} <span className="text-xs font-medium">itens com zero unidades</span></h4>
              </div>
            </div>

            {/* Alerta Crítico */}
            <div 
              onClick={() => setFiltroAlerta(filtroAlerta === "Crítico" ? "" : "Crítico")}
              className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all ${
                filtroAlerta === "Crítico" 
                  ? "bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-500/10" 
                  : "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${filtroAlerta === "Crítico" ? "bg-white/20" : "bg-amber-100 text-amber-600"}`}>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div>
                <span className={`text-[10px] uppercase font-black tracking-wider ${filtroAlerta === "Crítico" ? "text-amber-100" : "text-amber-500"}`}>Stock Crítico</span>
                <h4 className="text-lg font-black leading-tight">{totalCritico} <span className="text-xs font-medium">abaixo do limite mínimo</span></h4>
              </div>
            </div>
          </div>

          {/* BARRA DE FILTROS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Pesquisar por código ou descrição..."
                value={filtroPesquisa}
                onChange={(e) => setFiltroPesquisa(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-xs font-semibold text-slate-700"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              {filtroAlerta && (
                <button 
                  onClick={() => setFiltroAlerta("")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                >
                  Limpar Filtro Alerta <i className="fa-solid fa-xmark text-[10px]"></i>
                </button>
              )}
            </div>

            <div className="flex items-center justify-end pr-2 text-xs font-bold text-slate-400">
              Materiais Listados: <span className="text-green-900 ml-1 font-black">{materiaisFiltrados.length}</span>
            </div>
          </div>

          {/* LISTAGEM EM FORMATO DE CARDS EMPILHADOS */}
          <div className="grid grid-cols-1 gap-4">
            {materiaisFiltrados.length > 0 ? (
              materiaisFiltrados.map((mat) => (
                <div
                  key={mat.codigo}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between group relative overflow-hidden gap-4"
                >
                  {/* Linha de Status Lateral */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 
                    ${mat.estadoStock === "Esgotado" ? "bg-red-600" : ""}
                    ${mat.estadoStock === "Crítico" ? "bg-amber-500" : ""}
                    ${mat.estadoStock === "Normal" ? "bg-green-600" : ""}
                  `} />

                  {/* Bloco de Dados Principais */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 pl-2">
                    <div className="shrink-0">
                      <span className="text-xs font-black bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg tracking-wide inline-block">
                        {mat.codigo}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-green-900 text-base leading-tight group-hover:text-green-800 transition-colors truncate">
                        {mat.descricao}
                      </h3>
                      <span className="text-[10px] bg-slate-50 text-slate-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block">
                        {mat.categoria}
                      </span>
                    </div>
                  </div>

                  {/* Quantidades e Localização */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-4 sm:gap-8 text-xs sm:px-4">
                    {/* Localização */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Localização</span>
                      <span className="font-bold text-slate-700">{mat.localização}</span>
                    </div>

                    {/* Stock Mínimo */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Mínimo Requerido</span>
                      <span className="font-semibold text-slate-500">{mat.stockMinimo} u.</span>
                    </div>

                    {/* Quantidade Atual + Badge Semafórico */}
                    <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-400 font-medium sm:text-[10px] sm:uppercase sm:tracking-wider">Disponível</span>
                        <span className={`font-black text-sm 
                          ${mat.estadoStock === "Esgotado" ? "text-red-600" : ""}
                          ${mat.estadoStock === "Crítico" ? "text-amber-600" : ""}
                          ${mat.estadoStock === "Normal" ? "text-green-700" : ""}
                        `}>
                          {mat.quantidade} unidades
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black h-fit mt-3 sm:mt-0
                          ${mat.estadoStock === "Esgotado" ? "bg-red-50 text-red-700" : ""}
                          ${mat.estadoStock === "Crítico" ? "bg-amber-50 text-amber-700" : ""}
                          ${mat.estadoStock === "Normal" ? "bg-green-50 text-green-700" : ""}
                        `}
                      >
                        {mat.estadoStock}
                      </span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="border-t lg:border-t-0 border-slate-50 pt-3 lg:pt-0 flex items-center justify-between lg:justify-end shrink-0 lg:pl-4">
                    <span className="text-[10px] text-slate-400 font-bold lg:hidden">Ações:</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditarMaterial(mat)}
                        className="p-2 hover:bg-slate-50 text-slate-400 hover:text-green-900 rounded-lg transition border border-transparent hover:border-slate-100 cursor-pointer" 
                        title="Editar Material"
                      >
                        <i className="fa-solid fa-pen-to-square text-xs"></i>
                      </button>
                      <button 
                        onClick={() => handleExcluirMaterial(mat)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition border border-transparent hover:border-red-100 cursor-pointer" 
                        title="Remover Material"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 text-slate-400 text-sm font-medium">
                Nenhum material encontrado com os filtros aplicados.
              </div>
            )}
          </div>
        </section>

        {/* MODAL 1: CADASTRO / EDIÇÃO DE MATERIAL */}
        <Modal
          isOpen={openNovoMaterial}
          onClose={() => setOpenNovoMaterial(false)}
          title={modoEdicao ? "Editar Cadastro de Material" : "Cadastrar Novo Material no Stock"}
          icon={modoEdicao ? "fa-solid fa-pen-to-square" : "fa-solid fa-box-open"}
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Código */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Código do Material</label>
                  <div className="relative">
                    <i className="fa-solid fa-barcode absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      key={materialSelecionado?.codigo || "novo"}
                      defaultValue={materialSelecionado?.codigo || ""}
                      disabled={modoEdicao}
                      placeholder="Ex: MAT-105"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Categoria */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Categoria</label>
                  <div className="relative">
                    <i className="fa-solid fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select 
                      key={materialSelecionado?.categoria || "default"}
                      defaultValue={materialSelecionado?.categoria || "Consumíveis"}
                      className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer"
                    >
                      <option>Consumíveis</option>
                      <option>Lubrificantes</option>
                      <option>Peças de Reposição</option>
                      <option>Ferramentas</option>
                    </select>
                  </div>
                </div>

                {/* Descrição */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Descrição Técnica</label>
                  <div className="relative">
                    <i className="fa-solid fa-font absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      key={materialSelecionado?.descricao || ""}
                      defaultValue={materialSelecionado?.descricao || ""}
                      placeholder="Ex: Correia de Transmissão Industrial em V"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Quantidade Inicial */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Quantidade Inicial</label>
                  <div className="relative">
                    <i className="fa-solid fa-boxes-stacked absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="number"
                      key={materialSelecionado?.quantidade ?? "0"}
                      defaultValue={materialSelecionado?.quantidade ?? 0}
                      disabled={modoEdicao}
                      placeholder="0"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Stock Mínimo */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Limite Mínimo (Alerta)</label>
                  <div className="relative">
                    <i className="fa-solid fa-bell-cone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="number"
                      key={materialSelecionado?.stockMinimo || "5"}
                      defaultValue={materialSelecionado?.stockMinimo || 5}
                      placeholder="Ex: 5"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Localização */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Localização no Armazém</label>
                  <div className="relative">
                    <i className="fa-solid fa-map-pin absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      key={materialSelecionado?.localização || ""}
                      defaultValue={materialSelecionado?.localização || ""}
                      placeholder="Ex: Secção C - Prateleira Superior 2"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-amber-300 hover:bg-amber-200 active:scale-98 text-green-950 font-black py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer text-sm"
                >
                  {modoEdicao ? "Guardar Alterações Cadastrais" : "Registar Material no Inventário"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL 2: FLUXO DE ENTRADAS */}
        <Modal
          isOpen={openNovaEntrada}
          onClose={() => setOpenNovaEntrada(false)}
          title="Registar Entrada de Stock (Aprovisionamento)"
          icon="fa-solid fa-arrow-down-long text-green-600"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Material Alvo */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Selecionar Material</label>
                  <div className="relative">
                    <i className="fa-solid fa-box absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      {materiais.map(m => (
                        <option key={m.codigo}>{m.descricao} ({m.codigo})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fornecedor */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Fornecedor</label>
                  <div className="relative">
                    <i className="fa-solid fa-truck-front absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: Distribuidora Industrial S.A."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Quantidade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Quantidade a Entrar</label>
                  <div className="relative">
                    <i className="fa-solid fa-plus-minus absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="number"
                      placeholder="Ex: 10"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Valor Total */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Valor Total da Compra</label>
                  <div className="relative">
                    <i className="fa-solid fa-money-bill-wave absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: 45.000,00 AOA"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Data */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Data de Recebimento</label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-3.5 rounded-xl transition-all shadow-md shadow-green-700/10 cursor-pointer text-sm"
                >
                  Efetivar Entrada no Sistema
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL 3: FLUXO DE SAÍDAS */}
        <Modal
          isOpen={openNovaSaida}
          onClose={() => setOpenNovaSaida(false)}
          title="Registar Saída de Stock (Consumo Interno)"
          icon="fa-solid fa-arrow-up-long text-red-600"
        >
          <div className="bg-white p-1">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Material */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Material Requisitado</label>
                  <div className="relative">
                    <i className="fa-solid fa-box absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <select className="w-full pl-11 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm appearance-none cursor-pointer">
                      {materiais.map(m => (
                        <option key={m.codigo} disabled={m.quantidade === 0}>{m.descricao} ({m.quantidade} u. disponíveis)</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quantidade */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Quantidade de Saída</label>
                  <div className="relative">
                    <i className="fa-solid fa-minus absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="number"
                      placeholder="Ex: 2"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Ordem de Serviço */}
                <div>
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Ordem de Serviço (O.S.)</label>
                  <div className="relative">
                    <i className="fa-solid fa-file-signature absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Ex: OS-2026/89"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                    />
                  </div>
                </div>

                {/* Data */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">Data de Retirada</label>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-minus absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-3.5 rounded-xl transition-all shadow-md shadow-slate-800/10 cursor-pointer text-sm"
                >
                  Dar Baixa no Stock
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* MODAL SMALL PARA EXCLUSÃO DEFINITIVA DO MATERIAL */}
        <ModalSmall
          isOpen={openExcluirMaterial}
          onClose={() => setOpenExcluirMaterial(false)}
          title="Eliminar Material do Inventário"
          icon="fa-solid fa-trash-can"
        >
          <div className="p-1 space-y-4 text-center sm:text-left">
            <p className="text-slate-600 text-sm leading-relaxed">
              Tem a certeza de que deseja remover o material{" "}
              <span className="font-black text-green-900">
                {materialSelecionado?.descricao} ({materialSelecionado?.codigo})
              </span>{" "}
              do sistema? Esta ação apagará permanentemente a ficha cadastral do item e todo o seu histórico.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOpenExcluirMaterial(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Lógica para apagar da BD
                  setOpenExcluirMaterial(false);
                }}
                className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-xs transition shadow-md shadow-red-600/10 cursor-pointer"
              >
                Sim, Eliminar
              </button>
            </div>
          </div>
        </ModalSmall>

      </AdminLayout>
    </>
  );
}
