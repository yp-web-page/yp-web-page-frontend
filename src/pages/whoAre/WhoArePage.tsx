import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import { CONTACT_INFO } from '../../constants/social_networks';

const VALUES = [
    { g: '✦', t: 'Experiencia', d: 'Más de 20 años trabajando y combinando experiencia, tecnología y compromiso.' },
    { g: '◼', t: 'Tecnología de punta', d: 'Pioneros en nuevas técnicas de marcación que hoy ponemos a disposición de tu proyecto.' },
    { g: '●', t: 'Compromiso', d: 'Entregamos siempre lo mejor a nuestros clientes — sin excepciones.' },
    { g: '▲', t: 'Innovación', d: 'Mejora continua para liderar el ramo de la marcación publicitaria.' },
];

const STATS = [
    { n: '+20', l: 'AÑOS DE EXPERIENCIA' },
    { n: '100%', l: 'EMPRESA CALEÑA' },
    { n: '+1.000', l: 'CLIENTES SATISFECHOS' },
];

const GALLERY = [
    { src: 'https://www.yancapublicidad.com/wp-content/uploads/2024/09/20190113133815_IMG_1200-2048x1365.jpg', caption: 'Nuestro equipo' },
    { src: 'https://www.yancapublicidad.com/wp-content/uploads/2024/09/20190113133754_IMG_1199-768x512.jpg', caption: 'Oficinas' },
    { src: 'https://www.yancapublicidad.com/wp-content/uploads/2024/09/fachada-2-600x400.jpg', caption: 'Fachada Cali' },
];

const WhoArePage: React.FC = () => (
    <>
        <Helmet>
            <title>¿Quiénes Somos? | Yanca Publicidad</title>
            <meta name="description" content="Empresa caleña con más de 20 años de experiencia en artículos promocionales y tecnología de marcación." />
        </Helmet>

        <main className="bg-yp-paper">
            {/* HERO */}
            <section className="yp-gradient-radial text-white relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-accent opacity-20 blur-3xl" />
                <div className="relative max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
                    <div className="font-mono text-[11px] tracking-[0.25em] text-accent mb-4">NUESTRA HISTORIA</div>
                    <h1 className="font-display font-black text-[44px] lg:text-[76px] leading-[0.95] tracking-tight max-w-[900px]">
                        Más de 20 años marcando <span className="text-accent">ideas con precisión.</span>
                    </h1>
                    <p className="mt-6 text-white/75 text-[16px] lg:text-[17px] max-w-[640px] leading-relaxed">
                        Yanca Publicidad es una empresa caleña que combina experiencia, tecnología y compromiso para
                        entregar siempre lo mejor a sus clientes.
                    </p>
                    <div className="mt-12 grid sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-[760px]">
                        {STATS.map((s) => (
                            <div key={s.l} className="bg-yp-mid/70 p-6">
                                <div className="font-display font-black text-4xl text-accent">{s.n}</div>
                                <div className="font-mono text-[10.5px] tracking-[0.22em] text-white/55 mt-1.5">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY */}
            <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                    <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3">QUIÉNES SOMOS</div>
                    <h2 className="font-display font-black text-[36px] lg:text-[52px] leading-[1.02] text-yp-deep tracking-tight">
                        YANCA <br />
                        <span className="text-yp-bright">PUBLICIDAD</span> S.A.S
                    </h2>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white border border-yp-line rounded-full px-4 py-2 text-[12px] font-mono tracking-wide text-yp-muted">
                        <Icon name="map" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" />
                        Cali · Colombia
                    </div>
                </div>
                <div className="lg:col-span-7 space-y-5 text-[15px] leading-relaxed text-yp-ink">
                    <p>
                        Somos especialistas en artículos promocionales. Importamos y distribuimos una gran variedad de
                        souvenirs, ideales para sus campañas publicitarias y eventos ya sean empresariales o familiares.
                    </p>
                    <p>
                        Entre los cuales puedes encontrar una gran variedad de{' '}
                        <span className="font-semibold text-yp-deep">agendas, bolígrafos, llaveros, termos, memorias USB</span>{' '}
                        y muchos más. Estamos seguros que encontrarás el artículo que se ajuste a tu necesidad y presupuesto.
                    </p>
                    <p>
                        En Yanca Publicidad estamos empeñados en mejorar día a día con el gran objetivo de liderar el
                        ramo de la marcación de artículos publicitarios.
                    </p>
                    <p>
                        La innovación en diferentes técnicas de marcación es la razón por la cual nos ganamos la
                        confianza de clientes y colegas. Somos pioneros y hemos hecho posible la utilización de nuevas
                        tecnologías en el campo de la marcación de artículos promocionales.
                    </p>
                    <p className="text-yp-deep font-display font-semibold text-[17px] pt-2">
                        Conéctate a Yanca Publicidad y comienza a disfrutar de los beneficios de una decisión acertada
                        con la mejor relación costo-beneficio.
                    </p>
                </div>
            </section>

            {/* VALUES */}
            <section className="bg-white border-y border-yp-line">
                <div className="max-w-[1400px] mx-auto px-6 py-20">
                    <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3">NUESTROS PILARES</div>
                    <h2 className="font-display font-black text-[36px] lg:text-[44px] leading-[1.02] text-yp-deep tracking-tight">
                        Cuatro razones para confiar en nosotros.
                    </h2>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {VALUES.map((v, i) => (
                            <div key={v.t} className="rounded-3xl border border-yp-line bg-yp-paper p-6 card-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="size-14 rounded-2xl bg-yp-deep text-accent grid place-items-center font-display text-3xl">
                                        {v.g}
                                    </div>
                                    <div className="font-mono text-[10px] tracking-[0.22em] text-yp-muted">
                                        0{i + 1}
                                    </div>
                                </div>
                                <h3 className="font-display font-extrabold text-[20px] text-yp-deep mt-5">{v.t}</h3>
                                <p className="mt-2 text-[13.5px] text-yp-ink leading-relaxed">{v.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-24">
                <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
                    <div>
                        <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-2">EN EL TALLER</div>
                        <h2 className="font-display font-black text-[32px] lg:text-[40px] text-yp-deep tracking-tight">
                            Donde sucede la magia.
                        </h2>
                    </div>
                    <div className="text-[12.5px] text-yp-muted max-w-[320px]">
                        Conoce nuestras instalaciones en Cali — el corazón de cada proyecto que sale a tu marca.
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {GALLERY.map((g, i) => (
                        <figure
                            key={g.src}
                            className="group rounded-3xl overflow-hidden border border-yp-line bg-white card-shadow"
                        >
                            <div className="relative aspect-[4/3]">
                                <img
                                    src={g.src}
                                    alt={g.caption}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition group-hover:scale-105 duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-yp-deep/85 to-transparent p-5 text-white">
                                    <div className="font-mono text-[10px] tracking-[0.22em] text-white/65">
                                        VISTA {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <figcaption className="font-display font-bold text-[17px] mt-1">{g.caption}</figcaption>
                                </div>
                            </div>
                        </figure>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-[1400px] mx-auto px-6 pb-20 lg:pb-28">
                <div className="yp-gradient-radial relative overflow-hidden rounded-3xl text-white p-10 lg:p-14">
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            <div className="font-mono text-[10.5px] tracking-[0.25em] text-accent mb-3">HABLEMOS</div>
                            <h3 className="font-display font-black text-[32px] lg:text-[44px] leading-[1] tracking-tight">
                                Llámanos, escríbenos o visítanos — <span className="text-accent">con gusto te atendemos.</span>
                            </h3>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-3">
                            <Link
                                to="/contactanos"
                                className="inline-flex items-center justify-center gap-2 bg-accent text-yp-deep font-bold text-[13.5px] tracking-wide px-6 py-4 rounded-full hover:brightness-95 transition"
                            >
                                IR A CONTÁCTANOS
                                <Icon name="arrowRight" className="h-3.5 w-3.5" />
                            </Link>
                            <a
                                href={CONTACT_INFO.WHATSAPP_HREF}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-[13.5px] tracking-wide px-6 py-4 rounded-full transition"
                            >
                                <Icon name="whatsapp" className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" />
                                WhatsApp {CONTACT_INFO.WHATSAPP_NUMBER}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
);

export default WhoArePage;
