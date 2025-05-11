import LoginModal from "./LoginModal";
import NotificationModal from "./NotificationModal";
import RegisterModal from "./RegisterModal";
import { useModal } from "../../context/ModalContext";
import RecoverPasswordModal from "./RecoverPasswordModal";
import UserModal from "./UserModal";


const ModalManager = () => {
  const { currentModal, closeModal, isOpen, openModal, message, typeNotification } = useModal();

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
    </>
  );
};

export default ModalManager;