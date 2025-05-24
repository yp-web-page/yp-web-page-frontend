import BrandSlogan from "../../components/BrandSlogan";
import InfoCard from "../../components/InfoCard";
import ContactMap from "../../components/map/ContactMap";
import { Helmet } from "react-helmet";

const ContactUs: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Contáctanos | Yanca Publicidad S.A.S</title>
                <meta
                    name="description"
                    content="¿Tienes preguntas? En Yanca Publicidad S.A.S estamos aquí para ayudarte. Contáctanos por teléfono, correo o visítanos. ¡Más de 20 años de experiencia en publicidad y marcación!"
                />
                <meta name="keywords" content="contacto, Yanca Publicidad, artículos promocionales, marcación, publicidad, Cali" />
                <meta property="og:title" content="Contáctanos | Yanca Publicidad S.A.S" />
                <meta property="og:description" content="En Yanca Publicidad S.A.S estamos listos para ayudarte. Contáctanos por distintos medios. Más de 20 años de experiencia." />
                <meta property="og:type" content="website" />
                {/* TODO: Cambiar la URL a la correcta */}
                <meta property="og:url" content="https://tusitio.com/contacto" />
                <meta property="og:image" content="https://tusitio.com/images/yanca-banner.jpg" />
            </Helmet>
            <section className="flex flex-col items-center justify-center bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
                <h3 className="text-gray-600 text-base sm:text-lg">
                    Tienes alguna consulta?
                </h3>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                    Estamos aquí para ayudar.
                </h1>
                <div className="mx-auto w-12 h-0.5 bg-black mt-2" />
                <div className="flex flex-col md:flex-row gap-6 mt-6 mb-10 w-full max-w-5xl">
                    <InfoCard title="Líneas de Atención">
                        <p className="text-blue-600 font-bold mt-10">Tel. (602) 880 1935</p>
                        <p className="text-blue-600 font-bold">Whatsapp: 304 1289179</p>
                    </InfoCard>

                    <InfoCard title="Email">
                        <p className="text-gray-600">Para dudas y cotizaciones,</p>
                        <br />
                        <p className="text-blue-600 font-bold">sellosyanca@gmail.com</p>
                    </InfoCard>

                    <InfoCard title="Horarios de Atención">
                        <p className="text-blue-600 font-bold">Lunes a Viernes:</p>
                        <p className="text-blue-600 font-bold">
                            9:00am a 1:00pm - 2:00pm a 5:30pm
                        </p>
                        <p className="text-blue-600 font-bold">Sábados:</p>
                        <p className="text-blue-600 font-bold">9:00am a 2:00pm</p>
                    </InfoCard>
                </div>
                <ContactMap />
                <BrandSlogan />
            </section>
        </>
    );
};

export default ContactUs;