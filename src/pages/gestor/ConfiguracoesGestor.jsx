import { useState } from "react";
import GestorLayout from "./components/GestorLayout";

export default function ConfiguracoesGestor() {
  const [activeTab, setActiveTab] = useState("perfil");

  // Dados fictícios do administrador logado para preenchimento inicial
  const adminDados = {
    nome: "Analtina José",
    email: "analtina.jose@ecomaint.com",
    telefone: "+244 923 000 000",
    cargo: "Gestor",
    departamento: "Engenharia & Infraestrutura",
  };

  return (
    <>
      <title>Configurações | EcoMaint</title>

      <GestorLayout title="Configurações">
        <section className="space-y-6 animate-fade-in">
          
          {/* CABEÇALHO DA SECÇÃO */}
          <div className="flex flex-col bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <div>
              <h1 className="text-xl font-black text-green-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-green-700 rounded-full inline-block" />
                Configurações do Sistema
              </h1>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                Gerencie as suas informações credenciais, preferências de segurança e parametrizações da sua conta de acesso.
              </p>
            </div>

            {/* SEPARADORES / TABS */}
            <div className="flex gap-2 border-b border-slate-100 mt-6 -mb-2">
              <button
                onClick={() => setActiveTab("perfil")}
                className={`pb-3 text-xs font-black px-2 transition-all relative cursor-pointer ${
                  activeTab === "perfil" ? "text-green-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {activeTab === "perfil" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-800 rounded-full" />
                )}
                <i className="fa-solid fa-user-gear mr-1.5"></i> Meu Perfil
              </button>

              <button
                onClick={() => setActiveTab("seguranca")}
                className={`pb-3 text-xs font-black px-2 transition-all relative cursor-pointer ${
                  activeTab === "seguranca" ? "text-green-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {activeTab === "seguranca" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-800 rounded-full" />
                )}
                <i className="fa-solid fa-shield-halved mr-1.5"></i> Segurança e Senha
              </button>
            </div>
          </div>

          {/* CONTEÚDO DINÂMICO DOS SEPARADORES */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
            
            {/* TAB: MEU PERFIL */}
            {activeTab === "perfil" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h3 className="text-sm font-black text-green-900">Informações Pessoais</h3>
                  <p className="text-slate-400 text-[11px] font-medium">Atualize os seus dados de identificação e contacto dentro da EcoMaint.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nome Completo */}
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="text"
                          required
                          defaultValue={adminDados.nome}
                          placeholder="Seu nome completo"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-semibold text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Correio Eletrónico */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Correio Eletrónico
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="email"
                          required
                          defaultValue={adminDados.email}
                          placeholder="exemplo@ecomaint.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-semibold text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Contacto Telefónico */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Contacto Telefónico
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="text"
                          required
                          defaultValue={adminDados.telefone}
                          placeholder="+244 9XX XXX XXX"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm font-semibold text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Cargo / Perfil (Apenas Leitura ou Informativo) */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-slate-400">
                        Função Institucional
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input
                          type="text"
                          disabled
                          defaultValue={adminDados.cargo}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-100/60 text-slate-400 text-sm font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Departamento (Apenas Leitura ou Informativo) */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-slate-400">
                        Departamento Vinculado
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input
                          type="text"
                          disabled
                          defaultValue={adminDados.departamento}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-100/60 text-slate-400 text-sm font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-amber-300 hover:bg-amber-200 active:scale-95 text-green-950 font-black text-sm py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/5"
                    >
                      Guardar Alterações do Perfil
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: SEGURANÇA E SENHA */}
            {activeTab === "seguranca" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h3 className="text-sm font-black text-green-900">Alteração de Palavra-Passe</h3>
                  <p className="text-slate-400 text-[11px] font-medium">Certifique-se de usar uma senha forte e complexa para proteger os privilégios administrativos.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 max-w-xl">
                    {/* Senha Atual */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Palavra-Passe Atual
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="password"
                          required
                          placeholder="••••••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                        />
                      </div>
                    </div>

                    {/* Nova Senha */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Nova Palavra-Passe
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="password"
                          required
                          placeholder="Mínimo 8 caracteres"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                        />
                      </div>
                    </div>

                    {/* Confirmar Nova Senha */}
                    <div>
                      <label className="block mb-2 text-xs uppercase font-black tracking-wider text-green-900">
                        Confirmar Nova Palavra-Passe
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-circle-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input
                          type="password"
                          required
                          placeholder="Repita a nova senha"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white transition text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-green-800 hover:bg-green-700 active:scale-95 text-white font-black text-sm py-3.5 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-green-800/10"
                    >
                      Atualizar Credenciais
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </section>
      </GestorLayout>
    </>
  );
}
