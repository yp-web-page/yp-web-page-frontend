import Icon from '../icon/Icon';

type Service = {
    key: string;
    title: string;
    short: string;
    features: string[];
    glyph: string;
    tag: string;
};

const SERVICES: Service[] = [
    {
        key: 'laser',
        title: 'Corte y Grabado Láser',
        short: 'Precisión milimétrica en acrílico, MDF, madera, cuero y más.',
        features: ['Tolerancia ±0.1mm', 'Grabado fotográfico', 'Acrílico hasta 10mm'],
        glyph: '✦',
        tag: '01',
    },
    {
        key: 'uv',
        title: 'Impresión sobre Rígidos',
        short: 'Tinta UV-LED de alta resolución sobre cualquier sustrato.',
        features: ['Vidrio · Madera · Metal', 'Tinta blanca y barniz', 'Hasta 2.5×1.25 m'],
        glyph: '◼',
        tag: '02',
    },
    {
        key: 'dtf',
        title: 'Impresión DTF UV',
        short: 'Stickers y transfer con colores vibrantes sobre múltiples superficies.',
        features: ['Adhesivo premium', 'Resistente a la intemperie', 'Cualquier forma'],
        glyph: '●',
        tag: '03',
    },
    {
        key: 'sub',
        title: 'Sublimación',
        short: 'Color de alta definición sobre poliéster, mugs y termolaminados.',
        features: ['Mugs · Tazas · Camisetas', 'Color full pantone', 'Producción en serie'],
        glyph: '▲',
        tag: '04',
    },
];

const Services: React.FC = () => (
    <section id="servicios" className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 relative">
            <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
                <div className="max-w-[640px]">
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-yp-bright">
                        <span className="size-1.5 rounded-full bg-yp-bright" /> NUESTROS SERVICIOS
                    </div>
                    <h2 className="font-display font-black text-[40px] lg:text-[56px] leading-[1.02] mt-3 text-yp-deep tracking-tight">
                        Cuatro técnicas. <span className="text-yp-bright">Una calidad.</span>
                    </h2>
                    <p className="mt-4 text-[15px] text-yp-muted leading-relaxed">
                        Producción profesional con tecnología de punta. Te asesoramos en la mejor técnica según tu material,
                        volumen y presupuesto.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {SERVICES.map((s) => (
                    <div
                        key={s.key}
                        className="group relative bg-white rounded-3xl border border-yp-line card-shadow hover-lift overflow-hidden"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden bg-yp-paper">
                            <div className="absolute inset-0 bg-gradient-to-t from-yp-mid/90 via-yp-mid/55 to-yp-mid/30" />
                            <div className="absolute inset-0 grid place-items-center text-white/30 text-[110px] font-display leading-none">
                                {s.glyph}
                            </div>
                            <div className="absolute top-4 left-4 right-4 flex items-start justify-between text-white">
                                <span className="font-mono text-[11px] tracking-[0.25em] text-white/80">
                                    SERVICIO · {s.tag}
                                </span>
                                <div className="size-10 rounded-full bg-accent text-yp-deep grid place-items-center font-display font-black text-[16px]">
                                    {s.tag}
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h3 className="font-display font-extrabold text-2xl leading-tight">{s.title}</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-[14px] text-yp-ink leading-relaxed">{s.short}</p>
                            <ul className="mt-4 grid gap-2">
                                {s.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-[13px] text-yp-muted">
                                        <span className="size-4 rounded-full bg-yp-bright/10 text-yp-bright grid place-items-center">
                                            <Icon name="check" className="h-3 w-3" />
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
