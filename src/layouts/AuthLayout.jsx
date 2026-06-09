import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-100 flex">
      {/* Lado esquerdo */}
      <section className="hidden lg:flex w-1/2 bg-green-900 text-white items-center justify-center p-12 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-950 rounded-full -translate-x-32 -translate-y-32"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-950 rounded-full translate-x-40 translate-y-40"></div>

        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="w-24 h-24 rounded-3xl bg-amber-300 flex items-center justify-center mb-8">
            <i className="fa-solid fa-screwdriver-wrench text-4xl text-green-950"></i>
          </div>

          <h1 className="text-6xl font-black text-white mb-4">EcoMaint</h1>

          <div className="w-24 h-1 bg-amber-300 rounded-full mb-6"></div>

          <p className="text-lg text-slate-200 leading-relaxed">
            Sistema inteligente para gestão de manutenção, equipamentos,
            ocorrências, stock e equipas técnicas.
          </p>

          {/* Destaques */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <h3 className="text-amber-300 text-3xl font-black">24/7</h3>
              <p className="text-slate-300 text-sm">Monitorização</p>
            </div>

            <div>
              <h3 className="text-amber-300 text-3xl font-black">100%</h3>
              <p className="text-slate-300 text-sm">Digital</p>
            </div>

            <div>
              <h3 className="text-amber-300 text-3xl font-black">+∞</h3>
              <p className="text-slate-300 text-sm">Eficiência</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lado direito */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-100">
        <Outlet />
      </section>
    </main>
  );
}
