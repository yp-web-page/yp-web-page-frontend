import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import NotificationModal from "../components/modals/NotificationModal";
import { TypeNotification } from "../types/TypeNotifcation";

// Modal types
type ModalType = 'login' | 'register' | 'notification' | null;

interface ModalProviderProps {
  children: ReactNode;
}

// Context
interface ModalContextType {
  currentModal: ModalType;
  openModal: (type: Exclude<ModalType, null>, message?: string, typeNotification?: TypeNotification) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within ModalProvider');
    }
    return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [typeNotification, setTypeNotification] = useState<TypeNotification | undefined>(undefined);

  const openModal = (type: Exclude<ModalType, null>, message?: string, typeNotification?: TypeNotification) => {
    setCurrentModal(type);
    setIsOpen(true);
    setMessage(message);
    setTypeNotification(typeNotification);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal, isOpen }}>
        {children}

      {/* Global modals */}
      <LoginModal
        isOpen={currentModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => openModal("register")}
      />

      <RegisterModal
        isOpen={currentModal === "register"}
        onClose={closeModal}
      />

      <NotificationModal
        isOpen={currentModal === "notification"}
        message={message || ''}
        onClose={closeModal}
        type={typeNotification || 'success'}
      />  

    </ModalContext.Provider>
  );
};
