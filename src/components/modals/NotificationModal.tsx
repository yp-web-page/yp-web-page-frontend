import { TypeNotification } from "../../types/TypeNotifcation";
import Button from "../Button";
import Icon from "../icon/Icon";
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
                    <Icon
                        name="successful"
                        className="w-20 h-20 text-green-500 drop-shadow-xl"
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    />
                );
            case 'error':
                return (
                    <Icon
                        name="error"
                        className="w-20 h-20 text-red-500 drop-shadow-xl"
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    />
                );
            case 'warning':
                return (
                    <Icon
                        name="warning"
                        className="w-20 h-20 text-yellow-500 drop-shadow-xl"
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    />
                );
            case 'info':
                return (
                    <Icon
                        name="info"
                        className="w-20 h-20 text-blue-500 drop-shadow-xl"
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    />
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
                <Button
                    type="button"
                    className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={onClose}
                >
                    <Icon 
                        name="close"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    />
                </Button>
            </motion.div>
        </ModalWrapper>
    );
};

export default NotificationModal;