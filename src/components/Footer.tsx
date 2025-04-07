import React from 'react';
import { SVG_PATHS } from '../constants/svgPaths';
import { SOCIAL_NETWORKS } from '../constants/social_networks';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white">
            <nav className="flex-col mx-auto px-0">
                <div className='flex justify-between items-center py-4'>
                    <div className='flex items-center gap-x-2 px-4'>
                        <p className='text-text-light'>Copyright © 2025 YANCA PUBLICIDAD. Powered by YANCA PUBLICIDAD.</p>
                    </div>
                    <div className='flex gap-x-2 md:gap-x-4 px-4'>
                        <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d={SVG_PATHS.FACEBOOK}/>
                            </svg>
                        </a>
                        <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d={SVG_PATHS.INSTAGRAM}/>
                            </svg>
                        </a>
                        <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d={SVG_PATHS.LINKEDIN}/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className='flex bg-gray-950 gap-x-2 md:gap-x-4 items-center justify-center py-1.5'>
                    <a href="/aviso-legal" className='text-gray-200 hover:text-gray-300 transition-colors'>
                        Aviso Legal
                    </a>
                    <a href="/politicas-privacidad" className='text-gray-200 hover:text-gray-300 transition-colors'>
                        Políticas de Privacidad
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;