import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icon/Icon';
import { CONTACT_INFO } from '../../constants/social_networks';
import { useCarouselImages } from '../../hooks/useCarouselImages';

type Slide = { tag: string; title: string; sub: string; placeholder: string };

const SLIDES: Slide[] = [
    {
        tag: 'CORTE Y GRABADO LÁSER',
        title: 'Corte y Grabado Láser',
        sub: 'Ofrecemos servicio de corte láser y grabado sobre diferentes sustratos como metal, madera, cuero, plástico y vidrio. Contamos con equipos Trotec, IPG y Epilog y una robusta experiencia que te garantizará la máxima calidad del mercado.',
        placeholder: 'DTF · CABEZOTE',
    },
    {
        tag: 'IMPRESIÓN FULL COLOR SOBRE RÍGIDOS',
        title: 'Impresión full color sobre rígidos',
        sub: 'Contamos con tecnología UV-LED, que te permite marcar sustratos a full color como vidrio, plástico, madera y otros materiales tanto flexibles como rígidos.',
        placeholder: 'LÁSER · CABEZOTE',
    },
    {
        tag: 'GAFETES IDENTIFICADORES',
        title: 'Gafetes identificadores',
        sub: 'Vidrio, metal, madera, acrílico — impresión directa con tinta UV-LED.',
        placeholder: 'UV · CABEZOTE',
    },
];

const TRUST_ITEMS = [
    'CALIDAD GARANTIZADA',
    'ENVÍO NACIONAL',
    '+20 AÑOS DE EXPERIENCIA',
    'EQUIPOS DE ÚLTIMA GENERACIÓN',
    'ASESORÍA PERSONALIZADA',
];

const Hero: React.FC = () => {
    const [i, setI] = useState(0);
    const { data: carousel } = useCarouselImages();
    const images = carousel?.carouselImages ?? [];

    useEffect(() => {
        const t = setTimeout(() => setI((i + 1) % SLIDES.length), 5500);
        return () => clearTimeout(t);
    }, [i]);
    const s = SLIDES[i];
    const imageUrl = images[i % Math.max(images.length, 1)];

    return (
        <section className="relative yp-gradient-radial text-white overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
            <div className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-accent blur-3xl opacity-15" />

            <div className="max-w-[1400px] mx-auto px-6 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-12 gap-10 items-center relative">
                <div className="lg:col-span-7" key={i}>
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-[0.2em] text-white/85 mb-6 bg-white/10 border border-white/15">
                        <span className="size-1.5 rounded-full bg-accent" /> {s.tag}
                    </div>
                    <h1 className="font-display font-black text-[44px] sm:text-[58px] lg:text-[76px] leading-[0.95] tracking-tight">
                        {s.title.split('. ').map((line, k) => (
                            <span key={k} className="block">
                                {line}
                                {k === 0 ? '.' : ''}
                            </span>
                        ))}
                    </h1>
                    <p className="mt-6 text-white/75 text-[16px] lg:text-[18px] max-w-[560px] leading-relaxed">{s.sub}</p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href={CONTACT_INFO.WHATSAPP_HREF}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 bg-accent text-yp-deep font-bold text-[14px] px-6 py-4 rounded-full hover:brightness-95 transition"
                        >
                            COTIZAR EN 60 SEGUNDOS
                            <span className="size-7 rounded-full bg-yp-deep text-accent grid place-items-center group-hover:translate-x-0.5 transition">
                                <Icon name="arrowRight" className="h-3.5 w-3.5" />
                            </span>
                        </a>
                        <Link
                            to="/inventarios"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-[13.5px] font-medium px-5 py-3 rounded-full border border-white/20 hover:border-white/40 transition"
                        >
                            Ver catálogo
                            <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center gap-6 lg:gap-10">
                        {SLIDES.map((sl, k) => (
                            <button key={k} onClick={() => setI(k)} className="group text-left">
                                <div
                                    className={`font-mono text-[10px] tracking-[0.2em] mb-1 ${
                                        k === i ? 'text-accent' : 'text-white/40'
                                    }`}
                                >
                                    0{k + 1}
                                </div>
                                <div
                                    className={`h-px w-16 lg:w-24 ${
                                        k === i ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/40'
                                    } transition-colors`}
                                />
                                <div
                                    className={`mt-2 text-[11px] tracking-wider ${
                                        k === i ? 'text-white' : 'text-white/55'
                                    }`}
                                >
                                    {sl.tag}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[5/6] overflow-hidden">
                        {imageUrl ? (
                            <img
                                key={imageUrl}
                                src={imageUrl}
                                alt={s.tag}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                            />
                        ) : (
                            <div className="absolute inset-0 grid place-items-center bg-yp-paper font-mono text-[11px] tracking-[0.3em] text-yp-deep/55">
                                {s.placeholder}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-[#001428]/40 backdrop-blur">
                <div className="max-w-[1400px] mx-auto px-6 py-5 overflow-hidden marquee-mask">
                    <div className="ticker flex items-center gap-10 whitespace-nowrap text-white/60 text-[12px] tracking-[0.18em] w-max">
                        {Array.from({ length: 2 }).map((_, dup) => (
                            <div key={dup} className="flex items-center gap-10 shrink-0">
                                {TRUST_ITEMS.map((t) => (
                                    <span key={t + dup} className="inline-flex items-center gap-3">
                                        <Icon name="spark" className="h-3.5 w-3.5 text-accent" fill="currentColor" />
                                        <span>{t}</span>
                                        <span className="opacity-30 ml-3">●</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
