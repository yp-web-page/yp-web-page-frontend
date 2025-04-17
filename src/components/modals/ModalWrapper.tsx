import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Button from '../Button';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showIcon?: boolean;
  iconContent?: React.ReactNode;
  wrapperClassName?: string;
  contentClassName?: string;
  isNotification?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  showIcon = false,
  iconContent,
  wrapperClassName = "flex items-center justify-center",
  contentClassName = "relative my-1 sm:my-auto pointer-events-auto max-w-[95%] sm:max-w-md w-full mx-auto",
  isNotification = false
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
        <div className={`fixed inset-0 z-[9999] overflow-y-auto ${wrapperClassName}`}>
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
                  <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 z-10 w-20 sm:w-24">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4263EB] border-3 sm:border-4 border-white shadow-xl flex items-center justify-center mx-auto">
                      {iconContent}
                    </div>
                  </div>
                )}
                <div className="w-full max-w-[95%] sm:max-w-md mx-auto rounded-xl sm:rounded-2xl bg-white shadow-xl overflow-hidden relative pt-8 sm:pt-10">
                  <Button
                    type="reset"
                    onClick={onClose}
                    className="absolute top-4 sm:top-6 left-2 sm:left-3 text-gray-400 hover:text-gray-600 z-20"
                  >
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                  <div className={`px-7 sm:px-8 py-2 sm:py-3 mt-4 sm:mt-6`}>
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