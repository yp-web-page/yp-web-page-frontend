import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className='bg-gray-100'>
            <Header />
            <div className="container bg-white mx-auto px-4 py-8 max-w-4xl text-gray-700 mt-6 mb-6">
                <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
                
                <div className="space-y-6">
                    <p>
                        El Titular le informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios que puedan ser recabados durante la navegación a través del Sitio Web: <a href="https://www.yancapublicidad.com" className="text-blue-600 hover:underline">https://www.yancapublicidad.com</a>
                    </p>

                    <p>
                        En este sentido, el Titular cumple con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD).
                    </p>

                    <p>
                        El uso de sitio Web implica la aceptación de esta Política de Privacidad así como las condiciones incluidas en el Aviso Legal.
                    </p>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Identidad del Responsable</h2>
                        <ul className="list-none space-y-2">
                            <li><strong>Responsable:</strong> ANDRES PRADO</li>
                            <li><strong>Cédula de ciudadanía:</strong> 1151966382</li>
                            <li><strong>Domicilio:</strong> Cra 4 - 19-37, Valle del Cauca - Colombia</li>
                            <li><strong>Correo electrónico:</strong> <a href="mailto:impresion221@gmail.com" className="text-blue-600 hover:underline">impresion221@gmail.com</a></li>
                            <li><strong>Sitio Web:</strong> <a href="https://www.yancapublicidad.com" className="text-blue-600 hover:underline">https://www.yancapublicidad.com</a></li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Principios aplicados en el tratamiento de datos</h2>
                        <p>En el tratamiento de sus datos personales, el Titular aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos (RGPD):</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Principio de licitud, lealtad y transparencia:</strong> El Titular siempre requerirá el consentimiento para el tratamiento de los datos personales que puede ser para uno o varios fines específicos sobre los que el Titular informará al Usuario previamente con absoluta transparencia.</li>
                            <li><strong>Principio de minimización de datos:</strong> El Titular solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.</li>
                            <li><strong>Principio de limitación del plazo de conservación:</strong> El Titular mantendrá los datos personales recabados durante el tiempo estrictamente necesario para el fin o los fines del tratamiento.</li>
                            <li><strong>Principio de integridad y confidencialidad:</strong> Los datos personales recabados serán tratados de tal manera que su seguridad, confidencialidad e integridad está garantizada.</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Derechos</h2>
                        <p>El Titular le informa que sobre sus datos personales tiene derecho a:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Solicitar el acceso a los datos almacenados</li>
                            <li>Solicitar una rectificación o la supresión</li>
                            <li>Solicitar la limitación de su tratamiento</li>
                            <li>Oponerse al tratamiento</li>
                        </ul>
                        <p className="mt-4">No puede ejercitar el derecho a la portabilidad de los datos.</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Finalidad del tratamiento de datos personales</h2>
                        <p>Cuando usted se conecta al Sitio Web para mandar un correo al Titular, se suscribe a su boletín está facilitando información de carácter personal de la que el responsable es el Titular. Esta información puede incluir datos de carácter personal como pueden ser su dirección IP, nombre y apellidos, dirección física, dirección de correo electrónico, número de teléfono, y otra información.</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Seguridad de los datos personales</h2>
                        <p>Para proteger sus datos personales, el Titular toma todas las precauciones razonables y sigue las mejores prácticas de la industria para evitar su pérdida, mal uso, acceso indebido, divulgación, alteración o destrucción de los mismos.</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Política de Cookies</h2>
                        <p>Para que este sitio Web funcione correctamente necesita utilizar cookies, que es una información que se almacena en su navegador web.</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Cambios en la Política de Privacidad</h2>
                        <p>El Titular se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria.</p>
                        <p className="mt-2">Estas políticas estarán vigentes hasta que sean modificadas por otras debidamente publicadas.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicyPage;