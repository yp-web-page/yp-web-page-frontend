import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon/Icon';

type Section = { id: string; n: string; title: string; content: React.ReactNode };

const PRINCIPLES = [
    {
        n: '01',
        title: 'Licitud, lealtad y transparencia',
        body: 'El Titular siempre requerirá el consentimiento para el tratamiento de los datos personales, informando previamente al Usuario con absoluta transparencia.',
    },
    {
        n: '02',
        title: 'Minimización de datos',
        body: 'El Titular solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.',
    },
    {
        n: '03',
        title: 'Limitación del plazo',
        body: 'Los datos personales recabados se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento.',
    },
    {
        n: '04',
        title: 'Integridad y confidencialidad',
        body: 'Los datos personales recabados serán tratados de tal manera que su seguridad, confidencialidad e integridad están garantizadas.',
    },
];

const RIGHTS: { icon: string; title: string; body: string }[] = [
    { icon: 'eye', title: 'Acceso', body: 'Solicitar el acceso a los datos almacenados sobre usted.' },
    { icon: 'check', title: 'Rectificación / supresión', body: 'Solicitar una rectificación o la supresión de sus datos.' },
    { icon: 'lock', title: 'Limitación', body: 'Solicitar la limitación de su tratamiento en casos específicos.' },
    { icon: 'close', title: 'Oposición', body: 'Oponerse al tratamiento de sus datos personales.' },
];

const TITULAR = (
    <div className="bg-yp-deep rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[13.5px]">
            <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Responsable</div>
                <div className="font-display font-bold">Andrés Prado</div>
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Cédula</div>
                <div>1.151.966.382</div>
            </div>
            <div className="sm:col-span-2">
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Domicilio</div>
                <div>Cra 4 · 19-37 · Cali · Valle del Cauca · Colombia</div>
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Email</div>
                <a href="mailto:impresion221@gmail.com" className="text-accent hover:underline">
                    impresion221@gmail.com
                </a>
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-0.5">Sitio web</div>
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
);

const SECTIONS: Section[] = [
    { id: 's1', n: '01', title: 'Identidad del responsable', content: TITULAR },
    {
        id: 's2',
        n: '02',
        title: 'Principios aplicados en el tratamiento',
        content: (
            <>
                <p>
                    En el tratamiento de sus datos personales, el Titular aplicará los siguientes principios que se
                    ajustan a las exigencias del nuevo reglamento europeo de protección de datos (RGPD):
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {PRINCIPLES.map((p) => (
                        <div key={p.n} className="bg-white border border-yp-line rounded-xl p-5">
                            <div className="text-[10px] tracking-[0.25em] text-accent mb-2">{p.n}</div>
                            <div className="font-display font-bold text-[15px] text-yp-deep mb-1.5">{p.title}</div>
                            <p className="text-[13px]">{p.body}</p>
                        </div>
                    ))}
                </div>
            </>
        ),
    },
    {
        id: 's3',
        n: '03',
        title: 'Tus derechos',
        content: (
            <>
                <p>El Titular le informa que sobre sus datos personales tiene derecho a:</p>
                <div className="mt-5 space-y-2">
                    {RIGHTS.map((r) => (
                        <div key={r.title} className="flex items-start gap-4 bg-white border border-yp-line rounded-xl p-4">
                            <div className="size-9 rounded-lg bg-yp-paper grid place-items-center text-yp-deep shrink-0">
                                <Icon name={r.icon} className="h-4 w-4" />
                            </div>
                            <div>
                                <div className="font-display font-bold text-[14px] text-yp-deep">{r.title}</div>
                                <div className="text-[13px]">{r.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-5 bg-accent/10 border border-accent/40 rounded-xl p-4 text-[13px]">
                    <span className="font-display font-bold text-yp-deep">Nota · </span>
                    No puede ejercitar el derecho a la portabilidad de los datos.
                </div>
            </>
        ),
    },
    {
        id: 's4',
        n: '04',
        title: 'Finalidad del tratamiento',
        content: (
            <p>
                Cuando usted se conecta al Sitio Web para mandar un correo al Titular, o se suscribe a su boletín, está
                facilitando información de carácter personal de la que el responsable es el Titular. Esta información
                puede incluir datos de carácter personal como: dirección IP, nombre y apellidos, dirección física,
                dirección de correo electrónico, número de teléfono, y otra información.
            </p>
        ),
    },
    {
        id: 's5',
        n: '05',
        title: 'Seguridad de los datos personales',
        content: (
            <p>
                Para proteger sus datos personales, el Titular toma todas las precauciones razonables y sigue las
                mejores prácticas de la industria para evitar su pérdida, mal uso, acceso indebido, divulgación,
                alteración o destrucción de los mismos.
            </p>
        ),
    },
    {
        id: 's6',
        n: '06',
        title: 'Política de cookies',
        content: (
            <p>
                Para que este sitio Web funcione correctamente necesita utilizar cookies, que es información que se
                almacena en su navegador web.
            </p>
        ),
    },
    {
        id: 's7',
        n: '07',
        title: 'Cambios en la política',
        content: (
            <>
                <p>
                    El Titular se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a
                    novedades legislativas o jurisprudenciales, así como a prácticas de la industria.
                </p>
                <p className="mt-3">
                    Estas políticas estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
                </p>
            </>
        ),
    },
    {
        id: 's8',
        n: '08',
        title: 'Contacto',
        content: (
            <>
                <p>
                    Para ejercer sus derechos o resolver dudas sobre el tratamiento de sus datos, puede contactarnos
                    escribiendo a{' '}
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
                            Ejercer mis derechos
                        </div>
                        <div className="font-display font-bold text-[18px] text-yp-deep">Escríbenos por email</div>
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

const PrivacyPolicyPage: React.FC = () => {
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
                <title>Política de Privacidad | Yanca Publicidad</title>
                <meta
                    name="description"
                    content="Cómo recopilamos, tratamos y protegemos tus datos personales en Yanca Publicidad."
                />
            </Helmet>

            <main className="bg-yp-paper">
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
                            <span className="text-white">POLÍTICA DE PRIVACIDAD</span>
                        </nav>
                        <h1 className="font-display font-black text-[44px] sm:text-[64px] lg:text-[76px] leading-[0.95] tracking-tight max-w-[900px]">
                            Política de<br />privacidad.
                        </h1>
                        <p className="mt-5 text-white/70 max-w-[640px] text-[15px] leading-relaxed">
                            Cómo recopilamos, tratamos y protegemos tus datos personales cuando navegas y solicitas
                            servicios en Yanca Publicidad.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-2 text-[10px] tracking-[0.2em] uppercase">
                            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                Última actualización · Mar 2025
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                RGPD · UE 2016/679
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
                                                active ? 'bg-yp-deep text-accent' : 'text-yp-deep hover:bg-yp-paper'
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
                                    to="/aviso-legal"
                                    className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-yp-muted hover:text-yp-deep transition"
                                >
                                    <span>Aviso Legal</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Article */}
                    <article className="space-y-10">
                        {/* Intro */}
                        <div className="bg-white border border-yp-line rounded-2xl p-7 card-shadow">
                            <div className="text-[10px] tracking-[0.3em] text-yp-muted uppercase mb-3">Resumen</div>
                            <p className="text-[15px] text-yp-ink leading-[1.7]">
                                El Titular le informa sobre su Política de Privacidad respecto del tratamiento y
                                protección de los datos de carácter personal de los usuarios que puedan ser recabados
                                durante la navegación a través del Sitio Web{' '}
                                <a
                                    href="https://www.yancapublicidad.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-yp-bright border-b border-yp-bright/40 hover:border-yp-bright"
                                >
                                    yancapublicidad.com
                                </a>
                                .
                            </p>
                            <p className="text-[15px] text-yp-ink leading-[1.7] mt-3">
                                El Titular cumple con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
                                de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD). El uso
                                del Sitio Web implica la aceptación de esta Política de Privacidad así como las
                                condiciones incluidas en el{' '}
                                <Link
                                    to="/aviso-legal"
                                    className="text-yp-bright border-b border-yp-bright/40 hover:border-yp-bright"
                                >
                                    Aviso Legal
                                </Link>
                                .
                            </p>
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

export default PrivacyPolicyPage;
