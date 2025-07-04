import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Button from '../Button';
import Icon from '../icon/Icon';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showIcon?: boolean;
  iconContent?: React.ReactNode;
  wrapperClassName?: string;
  contentClassName?: string;
  isNotification?: boolean;
  childrenWrapperClassName?: string;
  childrenClassName?:string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  showIcon = false,
  iconContent,
  wrapperClassName = "flex justify-center items-start min-h-screen pt-20 sm:pt-28",
  contentClassName = "relative my-1 sm:my-auto pointer-events-auto max-w-[95%] sm:max-w-md w-full mx-auto",
  isNotification = false,
  childrenClassName = "px-4 sm:px-8 py-3 sm:py-5 flex-1 overflow-y-auto",
  childrenWrapperClassName = "w-full max-w-[95%] sm:max-w-md mx-auto rounded-xl sm:rounded-3xl bg-white shadow-2xl relative pt-20 sm:pt-24 max-h-[100dvh] flex flex-col overflow-auto",
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className={`fixed inset-0 z-[9999] overflow-y-scroll sm:overflow-y-auto h-full ${wrapperClassName}`}>
          {!isNotification && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px]"
              onClick={onClose}
            />
          )}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={contentClassName}
            onClick={(e) => e.stopPropagation()}
          >
            {!isNotification ? (
              <>
                {showIcon && (
                  <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#4263EB] border-[3px] sm:border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
                      {iconContent}
                    </div>
                  </div>
                )}
                <div className={childrenWrapperClassName}>
                  <Button
                    type="reset"
                    onClick={onClose}
                    className="absolute top-4 sm:top-6 left-2 sm:left-3 text-gray-400 hover:text-gray-600 z-20"
                  >
                    <Icon 
                      name="close"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    />
                  </Button>
                  <div className={childrenClassName }>
                    {children}
                  </div>
                </div>
              </>
            ) : (
              children
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body
  );
};

export default ModalWrapper;