import { useState } from "react";

const ContactMap: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    
    return(
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            {!loaded && (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                    Cargando mapa...
                </div>
            )}
            <iframe
                title="Map showing our location"
                src="https://maps.google.com/maps?q=carrera%204%2019-17&z=18&hl=en&t=m&output=embed&iwloc=near"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                onLoad={() => setLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default ContactMap;