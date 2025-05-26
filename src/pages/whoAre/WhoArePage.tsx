import React from "react";
import { Helmet } from "react-helmet";

const WhoArePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>¿Quiénes Somos? | Yanca Publicidad S.A.S</title>
                <meta name="description" content="Conoce a Yanca Publicidad S.A.S, empresa caleña con más de 20 años de experiencia en artículos promocionales y tecnología de marcación." />
            </Helmet>
            <div className="bg-background-primary font-bahamas-bold flex flex-col min-h-screen">
                <div className="container bg-white mx-auto px-40 py-2 max-w-4xl text-gray-700 mt-8 mb-8 flex flex-col items-center justify-center text-center">
                    <h1 className="text-3xl font-bold text-title-light mb-6">YANCA PUBLICIDAD S.A.S</h1>
                    <div className="space-y-6 text-gray-500">
                        <p>
                            Es una empresa Caleña con mas de 20 años trabajando y
                            combinando experiencia, tecnología y compromiso, para entregar
                            siempre lo mejor a nuestros clientes.
                        </p>
                        <p>
                            Somos especialista en artículos promocionales.
                            Importamos y distribuimos una gran variedad de souvenirs, ideales
                            para sus campañas publicitarias y eventos ya sean empresariales o
                            familiares. Entre los cuales puedes encontrar una gran variedad de
                            Agendas, Boligrafos, Llaveros, Termos, Memorias USB entre muchos mas!
                            estamos seguros que usted encontrara el artículo que se ajuste a su
                            necesidad y presupuesto.
                        </p>
                        <p>
                            En Yanca Publicidad estamos empeñados en mejorar día a día y con
                            el gran objetivo de liderar en el ramo de la marcación de artículos
                            publicitarios.
                        </p>
                        <p>
                            La innovación en diferentes técnicas de marcación es la razón por la
                            cual nos ganamos la confianza de clientes y colegas interesados en
                            obtener los mejores resultados en sus proyectos de publicidad impresa
                            y es por esto que somos pioneros y hemos hecho posible la utilización
                            de nuevas tecnologías en el campo de la marcación de artículos
                            promocionales y es esta tecnología de punta la que hoy colocamos a
                            disposición de su próximo proyecto.
                        </p>
                        <p>
                            Conéctese a Yanca Publicidad y comience a disfrutar de los beneficios
                            que genera la toma de una decisión acertada con la mejor relación
                            costo beneficio.
                        </p>
                        <p>
                            .. Llámenos, escribanos o visítenos y con gusto lo atenderemos
                        </p>
                        <img
                            src="https://www.yancapublicidad.com/wp-content/uploads/2024/09/20190113133815_IMG_1200-2048x1365.jpg"
                            alt="Equipo de Yanca Publicidad S.A.S"
                            className="w-full max-w-xs md:max-w-md lg:max-w-sm mx-auto rounded shadow"
                        />
                        <img
                            src="https://www.yancapublicidad.com/wp-content/uploads/2024/09/20190113133754_IMG_1199-768x512.jpg"
                            alt="Oficinas de Yanca Publicidad S.A.S"
                            className="w-full max-w-xs md:max-w-md lg:max-w-sm mx-auto rounded shadow"
                        />
                        <img
                            src="https://www.yancapublicidad.com/wp-content/uploads/2024/09/fachada-2-600x400.jpg"
                            alt="Fachada de Yanca Publicidad S.A.S"
                            className="w-full max-w-xs md:max-w-md lg:max-w-sm mx-auto rounded shadow"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-center mt-12 mb-8">
                    <span className="text-2xl md:text-3xl font-bahamas-bold text-gray-300 text-center tracking-wide uppercase">
                        TU IMAGÍNALO, NOSOTROS LO HACEMOS REALIDAD
                    </span>
                </div>
            </div>
        </>
    );
}

export default WhoArePage;