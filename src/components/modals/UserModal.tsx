import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ModalWrapper from './ModalWrapper';
import MenuItem from '../menu/MenuItem';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    anchorPos?: { top: number; left: number; width: number } | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleProfileClick = () => {
        navigate('/profile');
        onClose();
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            wrapperClassName="fixed inset-0 z-[9999] flex items-start justify-end pt-[60px] pl-2 sm:pt-14 sm:pl-0 md:pt-16"
            contentClassName="w-[40vw] max-w-[180px] sm:w-64 md:w-72 lg:w-80 bg-white rounded-lg shadow-lg overflow-hidden transform"
            isNotification={true}
        >
            <div ref={modalRef} className="py-1">
                <MenuItem 
                    icon="profile" 
                    text="Mi Perfil" 
                    onClick={handleProfileClick} 
                />
                <MenuItem 
                    icon="close" 
                    text="Cerrar Sesión" 
                    onClick={handleLogout} 
                    textClass="text-red-600" 
                    iconClass="text-red-500" 
                />
            </div>
        </ModalWrapper>
    );
};

export default UserModal;