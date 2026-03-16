// src/components/UI.jsx
// Komponen UI primitif: Card, Badge, Button, Modal
import { Icons } from "./Icons";

export const Card = ({ children, className = "", noPadding = false, ...props }) => (
  <div
    className={`bg-white rounded-[16px] border border-gray-200 shadow-sm transition-shadow hover:shadow-md overflow-hidden ${className}`}
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
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[14px] font-medium ${variants[variant]} ${className}`}
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
    "inline-flex items-center justify-center rounded-[12px] text-[16px] font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-secondary shadow-sm px-6 py-3 focus:ring-primary",
    outline:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 focus:ring-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2",
    danger:
      "bg-error text-white hover:bg-red-600 shadow-sm px-6 py-3 focus:ring-error",
    ghost_danger: "text-error hover:bg-red-50 p-2 rounded-[10px]",
    ghost_primary: "text-primary hover:bg-indigo-50 p-2 rounded-[10px]",
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[16px] shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="font-semibold text-[18px] font-display text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
