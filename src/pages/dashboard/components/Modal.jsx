import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, icon, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 bg-slate-100 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-200 bg-slate-100 z-10">
        
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-900 text-amber-300">
            <i className={`${icon} text-lg`}></i>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-green-900 font-black text-lg">
            {title}
          </h2>

          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">
            EcoMaint
          </p>
        </div>

        {/* Fechar */}
        <button
          onClick={onClose}
          className="
            w-10
            h-10
            cursor-pointer
            flex
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-400
            hover:bg-green-900
            hover:text-amber-300
            hover:border-green-900
            transition-all
            duration-300
          "
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
