import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TypeNotification } from "../types/TypeNotifcation";
import { Product } from '../types/ProductTypes';
// Modal types
type ModalType = 'login' | 'register' | 'notification' | 'recover' | 'user' | 'quotation' | null;

interface ModalProviderProps {
  children: ReactNode;
}

// Context
interface ModalContextType {
  currentModal: ModalType;
  openModal: (
    type: Exclude<ModalType, null>, 
    message?: string, 
    typeNotification?: TypeNotification,
    product?: Product,
  ) => void;
  closeModal: () => void;
  isOpen: boolean;
  message?: string | undefined;
  typeNotification?: TypeNotification | undefined;
  anchorPos?: { top: number, left: number, width: number } | null;
  product?: Product | undefined;
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
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const openModal = (
    type: Exclude<ModalType, null>, 
    message?: string, 
    typeNotification?: TypeNotification, 
    product?: Product,
  ) => {
    setCurrentModal(type);
    setIsOpen(true);
    setMessage(message);
    setTypeNotification(typeNotification);
    setProduct(product);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setIsOpen(false);
    setMessage(undefined);
    setTypeNotification(undefined);
    setProduct(undefined);
  };

  return (
    <ModalContext.Provider value={{ 
      openModal, 
      closeModal, 
      isOpen, 
      currentModal, 
      message, 
      typeNotification,
      product, 
    } as ModalContextType}
    >
      {children}
    </ModalContext.Provider>
  );
};
