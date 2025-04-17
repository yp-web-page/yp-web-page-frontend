import React from 'react';
import { ModalProvider } from '../../context/ModalContext';

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
};

export default RootLayout; 