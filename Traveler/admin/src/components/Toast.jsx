import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Toast types dengan warna tema Traveler
const TOAST_TYPES = {
    success: {
        bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
        borderColor: 'border-green-400',
        textColor: 'text-white',
        icon: '✈️',
        iconBg: 'bg-green-600'
    },
    error: {
        bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
        borderColor: 'border-red-400',
        textColor: 'text-white',
        icon: '⚠️',
        iconBg: 'bg-red-600'
    },
    warning: {
        bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
        borderColor: 'border-amber-400',
        textColor: 'text-white',
        icon: '🔔',
        iconBg: 'bg-amber-600'
    },
    info: {
        bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        borderColor: 'border-blue-400',
        textColor: 'text-white',
        icon: 'ℹ️',
        iconBg: 'bg-blue-600'
    },
    loading: {
        bgColor: 'bg-gradient-to-r from-gray-600 to-slate-700',
        borderColor: 'border-gray-400',
        textColor: 'text-white',
        icon: '⏳',
        iconBg: 'bg-gray-700'
    }
};

// Individual Toast Component
const Toast = ({ id, message, type = 'info', duration = 4000, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const config = TOAST_TYPES[type] || TOAST_TYPES.info;

    useEffect(() => {
        // Show animation
        const showTimer = setTimeout(() => setIsVisible(true), 10);

        // Auto remove
        const removeTimer = setTimeout(() => {
            handleRemove();
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(removeTimer);
        };
    }, [duration]);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(id);
        }, 300);
    };

    return (
        <div
            className={`
        flex items-center p-4 mb-3 rounded-lg shadow-lg border-l-4 
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isRemoving
                    ? 'translate-x-0 opacity-100 scale-100'
                    : 'translate-x-full opacity-0 scale-95'}
        hover:shadow-xl hover:scale-[1.02]
        max-w-md min-w-[300px]
      `}
        >
            {/* Icon */}
            <div className={`
        flex-shrink-0 w-8 h-8 rounded-full ${config.iconBg} 
        flex items-center justify-center mr-3 text-sm
      `}>
                {config.icon}
            </div>

            {/* Message */}
            <div className="flex-1 mr-3">
                <p className="text-sm font-medium leading-relaxed">
                    {message}
                </p>
            </div>

            {/* Close Button */}
            <button
                onClick={handleRemove}
                className="
          flex-shrink-0 w-6 h-6 rounded-full 
          bg-white bg-opacity-20 hover:bg-opacity-30
          flex items-center justify-center
          transition-all duration-200
          text-white hover:text-gray-200
        "
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
    if (toasts.length === 0) return null;

    return createPortal(
        <div className="
      fixed top-4 right-4 z-[9999] 
      flex flex-col items-end
      pointer-events-none
    ">
            <div className="pointer-events-auto">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onRemove={removeToast}
                    />
                ))}
            </div>
        </div>,
        document.body
    );
};

// Toast Context
export const ToastContext = React.createContext();

// Toast Provider
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        const newToast = { id, message, type, duration };

        setToasts(prev => [...prev, newToast]);

        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const removeAllToasts = () => {
        setToasts([]);
    };

    // Convenient methods
    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
        loading: (message, duration = 10000) => addToast(message, 'loading', duration),
        remove: removeToast,
        clear: removeAllToasts
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Custom Hook
export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export default ToastProvider;