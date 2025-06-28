import LoginModal from "./LoginModal";
import NotificationModal from "./NotificationModal";
import RegisterModal from "./RegisterModal";
import { useModal } from "../../context/ModalContext";
import RecoverPasswordModal from "./RecoverPasswordModal";
import UserModal from "./UserModal";
import QuotationModal from "./QuotationModal";


const ModalManager = () => {
  const { currentModal, closeModal, isOpen, openModal, message, typeNotification, product } = useModal();

  return (
    <>
      {currentModal === 'login' && (
        <LoginModal
          isOpen={isOpen}
          onClose={closeModal}
          onSwitchToRegister={() => openModal('register')}
        />
      )}
      {currentModal === 'register' && (
        <RegisterModal
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
      {currentModal === 'recover' && (
        <RecoverPasswordModal 
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
      {currentModal === 'notification' && (
        <NotificationModal
          isOpen={isOpen}
          onClose={closeModal}
          message={message || ''}
          type={typeNotification || 'success'}
        />
      )}
      {currentModal === 'user' && (
        <UserModal
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
      {currentModal === 'quotation' && (
        <QuotationModal
          isOpen={isOpen}
          onClose={closeModal}
          product={product}
        />
      )}
    </>
  );
};

export default ModalManager;