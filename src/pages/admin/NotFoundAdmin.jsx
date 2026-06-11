import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

export default function NotFoundAdmin() {
  const navigate = useNavigate();
  const [contagem, setContagem] = useState(10);

  // Redirecionamento automático após 10 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setContagem((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard/admin/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <title>Página Não Encontrada | EcoMaint</title>

      <AdminLayout title="Erro 404">
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          
          {/* BLOCO DO ERRO CÓDIGO */}
          <div className="relative mb-2">
            <h1 className="text-8xl font-black text-slate-100 select-none tracking-widest">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-red-50 text-red-700 border border-red-100 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                <i className="fa-solid fa-triangle-exclamation mr-1"></i> Ativo Não Encontrado
              </span>
            </div>
          </div>

          {/* MENSAGEM PRINCIPAL */}
          <div className="max-w-md space-y-2">
            <h2 className="text-xl font-black text-green-900">
              O link que tentou aceder está indisponível
            </h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              A página, relatório ou ordem de serviço pode ter sido movida de setor, eliminada permanentemente ou o URL digitado está incorreto.
            </p>
          </div>

          {/* CONTADOR VISUAL */}
          <div className="mt-6 inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 shadow-2xs">
            <i className="fa-solid fa-spinner animate-spin text-green-700 text-[10px]"></i>
            Redirecionando automaticamente em <span className="text-green-900 font-black">{contagem}s</span>
          </div>

          {/* BOTÕES DE AÇÃO IMEDIATA */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-xs sm:max-w-none justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 px-6 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <i className="fa-solid fa-arrow-left text-[10px]"></i>
              Voltar ao ecrã anterior
            </button>

            <button
              onClick={() => navigate("/dashboard/admin/")}
              className="bg-amber-300 hover:bg-amber-200 text-green-950 font-black text-xs py-3.5 px-6 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-amber-500/5"
            >
              <i className="fa-solid fa-house text-[10px]"></i>
              Ir para o Dashboard
            </button>
          </div>

        </section>
      </AdminLayout>
    </>
  );
}
