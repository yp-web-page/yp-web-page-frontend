import { TypeNotification } from "../../types/TypeNotifcation";
import ModalWrapper from "./ModalWrapper";
import { motion } from 'framer-motion';

interface NotificationModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    type?: TypeNotification;
    title?: string;
    description?: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
    isOpen, 
    message, 
    onClose,
    type = 'success',
    title,
    description
}) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-20 h-20 text-green-500 drop-shadow-xl" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-20 h-20 text-red-500 drop-shadow-xl" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-20 h-20 text-yellow-500 drop-shadow-xl" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-20 h-20 text-blue-500 drop-shadow-xl" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success': return 'bg-white';
            case 'error': return 'bg-white';
            case 'warning': return 'bg-white';
            case 'info': return 'bg-white';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'success': return 'text-green-800';
            case 'error': return 'text-red-800';
            case 'warning': return 'text-yellow-800';
            case 'info': return 'text-blue-800';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success': return 'border-green-200';
            case 'error': return 'border-red-200';
            case 'warning': return 'border-yellow-200';
            case 'info': return 'border-blue-200';
        }
    };

    const getTitle = () => {
        if (title) return title;
        switch (type) {
            case 'success': return '¡Operación Exitosa!';
            case 'error': return '¡Error!';
            case 'warning': return '¡Advertencia!';
            case 'info': return 'Información';
        }
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            wrapperClassName="flex items-start justify-end p-4"
            contentClassName="w-full max-w-sm pointer-events-auto"
            isNotification={true}
        >
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className={`flex items-start p-4 rounded-xl shadow-lg border ${getBgColor()} ${getBorderColor()}`}
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1 
                    }}
                    className="flex-shrink-0 mr-3"
                >
                    {getIcon()}
                </motion.div>
                <div className="flex-1 min-w-0">
                    <motion.div
                        className="space-y-1"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className={`text-base font-semibold ${getTextColor()}`}>
                            {getTitle()}
                        </h2>
                        <p className={`text-sm ${getTextColor()}`}>
                            {message}
                        </p>
                        {description && (
                            <p className="text-xs text-gray-500">
                                {description}
                            </p>
                        )}
                    </motion.div>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </ModalWrapper>
    );
};

export default NotificationModal;