import React, { useEffect } from 'react';

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    error: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 border px-4 py-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-3 ${typeStyles[type] || typeStyles.info}`}>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-white">
        &times;
      </button>
    </div>
  );
};

export default Toast;
