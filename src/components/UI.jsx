// src/components/UI.jsx
// Komponen UI primitif: Card, Badge, Button, Modal, Skeleton
import { Icons } from "./Icons";

export const Card = ({ children, className = "", noPadding = false, ...props }) => (
  <div
    className={`bg-white rounded-[16px] border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden ${className}`}
    {...props}
  >
    {noPadding ? children : <div className="p-6">{children}</div>}
  </div>
);

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-indigo-50 text-primary border border-indigo-100",
    outline: "bg-white border border-gray-200 text-gray-600",
    primary: "bg-primary text-white",
    success: "bg-emerald-50 text-success border border-emerald-100",
    warning: "bg-amber-50 text-warning border border-amber-100",
    error: "bg-red-50 text-error border border-red-100",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-[12px] text-[15px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-secondary shadow-indigo-200/50 shadow-lg px-6 py-3.5 focus:ring-primary",
    outline:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-6 py-3.5 focus:ring-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2",
    danger:
      "bg-error text-white hover:bg-red-600 shadow-red-200/50 shadow-lg px-6 py-3.5 focus:ring-error",
    ghost_danger: "text-error hover:bg-red-50 p-2.5 rounded-[10px]",
    ghost_primary: "text-primary hover:bg-indigo-50 p-2.5 rounded-[10px]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-bold text-[20px] font-display text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-[12px] ${className}`} />
);

export const EmptyState = ({ message = "Tidak ada data ditemukan", icon: Icon = Icons.Search }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 rounded-[24px] bg-gray-50 flex items-center justify-center text-gray-300 mb-6 border border-gray-100">
      <Icon className="w-10 h-10" />
    </div>
    <h4 className="text-[18px] font-bold text-gray-900 mb-2">Pencarian Nihil</h4>
    <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">{message}</p>
  </div>
);