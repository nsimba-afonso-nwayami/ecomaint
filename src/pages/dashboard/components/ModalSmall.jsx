import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function ModalSmall({
  isOpen,
  onClose,
  title,
  icon,
  children,
}) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-950/40 backdrop-blur-sm p-4">
      {/* Modal */}
      <div className="w-full max-w-md bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
          {icon && (
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-900 text-amber-300">
              <i className={`${icon} text-sm`}></i>
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-sm font-bold text-green-900">
              {title}
            </h2>

            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              EcoMaint
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-8
              h-8
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
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 text-slate-700">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}