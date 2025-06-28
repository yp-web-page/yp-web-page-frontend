import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderVisible(scrollPosition < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Si estamos en la página principal, no renderizamos el botón
    if (location.pathname === '/') {
        return null;
    }

    return (
        <button
            onClick={() => navigate(-1)}
            className={`fixed z-50 bg-transparent rounded-full p-2 flex items-center justify-center transition-all duration-200 hover:scale-125 ${
                isHeaderVisible 
                    ? 'top-[95px] left-6'
                    : 'top-6 left-6'
            }`}
            aria-label="Volver atrás"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
    );
};

export default BackButton