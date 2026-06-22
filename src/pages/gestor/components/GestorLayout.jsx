import { useState } from "react";
import SidebarGestor from "./SidebarGestor";
import HeaderGestor from "./HeaderGestor";

export default function GestorLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-700 relative overflow-hidden">
      
      {/* ELEMENTOS DECORATIVOS */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-700/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-900/10 blur-[140px] rounded-full pointer-events-none" />

      {/* SIDEBAR */}
      <SidebarGestor
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* CONTEÚDO */}
      <div className="flex-1 md:ml-64 flex flex-col relative z-10">
        
        {/* HEADER */}
        <HeaderGestor
          title={title}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MAIN */}
        <main className="mt-20 px-6 py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
