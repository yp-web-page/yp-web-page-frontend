import React from 'react';
import { Link } from 'react-router';
import { SOCIAL_NETWORKS } from '../constants/social_networks';
import Icon from './icon/Icon';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white">
            <nav className="flex-col mx-auto px-0">
                <div className='flex justify-between items-center py-4'>
                    <div className='flex items-center gap-x-2 px-4 text-xs md:text-sm'>
                        <p className='text-text-light'>Copyright © 2025 YANCA PUBLICIDAD. Powered by YANCA PUBLICIDAD.</p>
                    </div>
                    <div className='flex gap-x-2 md:gap-x-4 px-4'>
                        <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Icon 
                                name="facebook"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            />
                        </a>
                        <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Icon 
                                name="instagram"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            />
                        </a>
                        <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <Icon 
                                name="linkedin"
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            />
                        </a>
                    </div>
                </div>
                <div className='flex bg-gray-950 gap-x-2 text-xs md:text-sm md:gap-x-4 items-center justify-center py-1.5'>
                    <Link to="/aviso-legal" className='text-gray-200 hover:text-gray-300 transition-colors'>
                        Aviso Legal
                    </Link>
                    <Link to="/politicas-privacidad" className='text-gray-200 hover:text-gray-300 transition-colors'>
                        Políticas de Privacidad
                    </Link>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;