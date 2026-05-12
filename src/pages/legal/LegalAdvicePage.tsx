import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

type Section = {
    id: string;
    n: string;
    title: string;
    content: React.ReactNode;
};

const SECTIONS: Section[] = [
    {
        id: 's1',
        n: '01',
        title: 'Identificación y titularidad',
        content: (
            <p>
                A continuación el Titular expone sus datos identificativos para conocimiento de los usuarios del Sitio
                Web. Los datos completos pueden consultarse en la tarjeta superior.
            </p>
        ),
    },
    {
        id: 's2',
        n: '02',
        title: 'Finalidad',
        content: (
            <p>
                La finalidad del Sitio Web es informar sobre los servicios de impresión, marcación, promocionales y
                publicidad ofrecidos por Yanca Publicidad, así como facilitar la cotización y gestión de pedidos a
                clientes finales y publicistas.
            </p>
        ),
    },
    {
        id: 's3',
        n: '03',
        title: 'Condiciones de uso',
        content: (
            <>
                <p>
                    La utilización del Sitio Web le otorga la condición de Usuario, e implica la aceptación completa de
                    todas las cláusulas y condiciones de uso incluidas en las páginas:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                    <li>Aviso Legal</li>
                    <li>Política de Privacidad</li>
                </ul>
                <p className="mt-3">
                    Si no estuviera conforme con todas y cada una de estas cláusulas y condiciones absténgase de
                    utilizar el Sitio Web. El acceso al Sitio Web no supone, en modo alguno, el inicio de una relación
                    comercial con el Titular.
                </p>
            </>
        ),
    },
    {
        id: 's4',
        n: '04',
        title: 'Medidas de seguridad',
        content: (
            <>
                <p>
                    Los datos personales que facilite al Titular pueden ser almacenados en bases de datos automatizadas
                    o no, cuya titularidad corresponde en exclusiva al Titular, que asume todas las medidas de índole
                    técnica, organizativa y de seguridad que garantizan la confidencialidad, integridad y calidad de la
                    información contenida en las mismas de acuerdo con lo establecido en la normativa vigente en
                    protección de datos.
                </p>
                <p className="mt-3">
                    No obstante, debe ser consciente que las medidas de seguridad de los sistemas informáticos en
                    Internet no son enteramente fiables y que, por tanto el Titular no puede garantizar la inexistencia
                    de virus u otros elementos que puedan producir alteraciones en los sistemas informáticos del
                    Usuario.
                </p>
            </>
        ),
    },
    {
        id: 's5',
        n: '05',
        title: 'Tratamiento de datos personales',
        content: (
            <p>
                Puede consultar toda la información relativa al tratamiento de datos personales que recoge el Titular
                en la{' '}
                <Link
                    to="/politicas-privacidad"
                    className="text-yp-bright border-b border-yp-bright/40 hover:border-yp-bright"
                >
                    Política de Privacidad
                </Link>
                .
            </p>
        ),
    },
    {
        id: 's6',
        n: '06',
        title: 'Contenidos',
        content: (
            <>
                <p>
                    El Titular ha obtenido la información, el contenido multimedia y los materiales incluidos en el
                    Sitio Web de fuentes que considera fiables, pero, si bien ha tomado todas las medidas razonables
                    para asegurar que la información contenida es correcta, el Titular no garantiza que sea exacta,
                    completa o actualizada.
                </p>
                <p className="mt-3">
                    Queda prohibido transmitir o enviar a través del Sitio Web cualquier contenido ilegal o ilícito,
                    virus informáticos, o mensajes que, en general, afecten o violen derechos del Titular o de terceros.
                </p>
            </>
        ),
    },
    {
        id: 's7',
        n: '07',
        title: 'Política de cookies',
        content: (
            <>
                <p>El Titular obtiene y conserva la siguiente información acerca de los visitantes del Sitio Web:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                    <li>El nombre de dominio del proveedor (PSI) y/o dirección IP que les da acceso a la red.</li>
                    <li>La fecha y hora de acceso al sitio Web.</li>
                    <li>La dirección de Internet origen del enlace que dirige al sitio Web.</li>
                    <li>El número de visitantes diarios de cada sección.</li>
                </ul>
                <p className="mt-3">
                    La información obtenida es totalmente anónima, y en ningún caso puede ser asociada a un Usuario
                    concreto e identificado.
                </p>
            </>
        ),
    },
    {
        id: 's8',
        n: '08',
        title: 'Enlaces a otros sitios web',
        content: (
            <>
                <p>
                    El Titular puede proporcionarle acceso a sitios web de terceros mediante enlaces con la finalidad
                    exclusiva de informar sobre la existencia de otras fuentes de información en Internet.
                </p>
                <p className="mt-3">
                    Estos enlaces no suponen en ningún caso una sugerencia o recomendación, y están fuera del control
                    del Titular, por lo que no se asume responsabilidad del contenido de los sitios web vinculados ni
                    del resultado que obtenga al seguir los enlaces.
                </p>
            </>
        ),
    },
    {
        id: 's9',
        n: '09',
        title: 'Propiedad intelectual e industrial',
        content: (
            <p>
                Todos los derechos están reservados. Todo acceso a este Sitio Web está sujeto a las siguientes
                condiciones: la reproducción, almacenaje permanente y la difusión de los contenidos o cualquier otro
                uso que tenga finalidad pública o comercial queda expresamente prohibida sin el consentimiento previo
                expreso y por escrito del Titular.
            </p>
        ),
    },
    {
        id: 's10',
        n: '10',
        title: 'Contacto',
        content: (
            <>
                <p>
                    En caso de que usted tenga cualquier duda acerca de este Aviso Legal o quiera realizar cualquier
                    comentario sobre el Sitio Web, puede enviar un mensaje de correo electrónico a la dirección:{' '}
                    <a
                        href="mailto:impresion221@gmail.com"
                        className="text-yp-bright border-b border-yp-bright/40 hover:border-yp-bright"
                    >
                        impresion221@gmail.com
                    </a>
                    .
                </p>
                <div className="mt-6 bg-yp-paper border border-yp-line rounded-2xl p-6 flex flex-wrap items-center gap-4 justify-between">
                    <div>
                        <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase mb-1">
                            ¿Dudas legales?
                        </div>
                        <div className="font-display font-bold text-[18px] text-yp-deep">
                            Escríbenos por email
                        </div>
                    </div>
                    <a
                        href="mailto:impresion221@gmail.com"
                        className="inline-flex items-center gap-2 text-[10.5px] tracking-[0.2em] uppercase bg-yp-deep text-accent px-5 py-3 rounded-full hover:bg-yp-mid transition"
                    >
                        Contactar →
                    </a>
                </div>
            </>
        ),
    },
];

const LegalAdvicePage: React.FC = () => {
    const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

    useEffect(() => {
        const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        if (!sections.length) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActiveId(e.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' },
        );
        sections.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <Helmet>
                <title>Aviso Legal | Yanca Publicidad</title>
                <meta
                    name="description"
                    content="Términos y condiciones que regulan el acceso y uso del sitio web de Yanca Publicidad."
                />
            </Helmet>

            <main className="bg-yp-paper" style={{ scrollPaddingTop: '96px' }}>
                {/* Hero */}
                <section className="relative yp-gradient-radial text-white overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
                    <div className="relative max-w-[1200px] mx-auto px-6 py-16 lg:py-20">
                        <nav className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-accent mb-4 uppercase">
                            <Link to="/" className="hover:text-white transition">
                                INICIO
                            </Link>
                            <span>·</span>
                            <span>LEGAL</span>
                            <span>·</span>
                            <span className="text-white">AVISO LEGAL</span>
                        </nav>
                        <h1 className="font-display font-black text-[44px] sm:text-[64px] lg:text-[76px] leading-[0.95] tracking-tight max-w-[900px]">
                            Aviso<br />legal.
                        </h1>
                        <p className="mt-5 text-white/70 max-w-[620px] text-[15px] leading-relaxed">
                            Términos y condiciones que regulan el acceso y uso del sitio web de Yanca Publicidad.
                            Léelos antes de utilizar nuestros servicios.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2 text-[10px] tracking-[0.2em] uppercase">
                            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                Última actualización · Mar 2025
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                Versión · 1.0
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-accent text-yp-deep font-bold">
                                {SECTIONS.length} secciones
                            </span>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-[1200px] mx-auto px-6 py-14 grid lg:grid-cols-[260px_1fr] gap-10">
                    {/* TOC */}
                    <aside className="lg:sticky lg:top-[96px] lg:self-start">
                        <div className="bg-white rounded-2xl border border-yp-line card-shadow p-5">
                            <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase mb-3">Índice</div>
                            <nav className="flex flex-col gap-1">
                                {SECTIONS.map((s) => {
                                    const active = s.id === activeId;
                                    return (
                                        <a
                                            key={s.id}
                                            href={`#${s.id}`}
                                            className={`font-display font-semibold text-[13px] px-3 py-2 rounded-lg flex items-baseline gap-2 transition ${
                                                active
                                                    ? 'bg-yp-deep text-accent'
                                                    : 'text-yp-deep hover:bg-yp-paper'
                                            }`}
                                        >
                                            <span
                                                className={`text-[10px] ${
                                                    active ? 'text-accent/80' : 'text-yp-muted'
                                                }`}
                                            >
                                                {s.n}
                                            </span>
                                            <span>{s.title}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                            <div className="mt-5 pt-5 border-t border-yp-line">
                                <Link
                                    to="/politicas-privacidad"
                                    className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-yp-muted hover:text-yp-deep transition"
                                >
                                    <span>Política de Privacidad</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Article */}
                    <article className="space-y-10">
                        {/* Titular card */}
                        <div className="bg-yp-deep rounded-2xl p-7 text-white relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/15 blur-3xl" />
                            <div className="relative">
                                <div className="text-[10px] tracking-[0.3em] text-accent mb-3 uppercase">
                                    Datos del titular
                                </div>
                                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[13.5px]">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                                            Titular
                                        </div>
                                        <div className="font-display font-bold">Andrés Prado</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                                            Cédula
                                        </div>
                                        <div>1.151.966.382</div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                                            Domicilio
                                        </div>
                                        <div>Cra 4 · 19-37 · Cali · Valle del Cauca · Colombia</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                                            Email
                                        </div>
                                        <a
                                            href="mailto:impresion221@gmail.com"
                                            className="text-accent hover:underline"
                                        >
                                            impresion221@gmail.com
                                        </a>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">
                                            Sitio web
                                        </div>
                                        <a
                                            href="https://www.yancapublicidad.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-accent hover:underline"
                                        >
                                            yancapublicidad.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sections */}
                        {SECTIONS.map((s) => (
                            <section key={s.id} id={s.id} className="scroll-mt-24">
                                <div className="text-[10px] tracking-[0.3em] text-yp-muted uppercase mb-2">
                                    Sección · {s.n}
                                </div>
                                <h3 className="font-display font-extrabold text-[26px] text-yp-deep mb-3">
                                    {s.title}
                                </h3>
                                <div className="text-yp-ink leading-[1.7] text-[15px]">{s.content}</div>
                            </section>
                        ))}
                    </article>
                </section>
            </main>
        </>
    );
};

export default LegalAdvicePage;
