type Step = { n: string; t: string; d: string };

const STEPS: Step[] = [
    { n: '01', t: 'Cotiza', d: 'Sube tu arte o cuéntanos tu idea. Recibe precio en menos de 1 hora hábil.' },
    { n: '02', t: 'Aprueba', d: 'Revisamos arte, material y acabados. Confirmas y producimos.' },
    { n: '03', t: 'Producimos', d: 'Equipos calibrados y control de calidad en cada etapa del proceso.' },
    { n: '04', t: 'Recibe', d: 'Empacado seguro, entregas en Cali o envío nacional certificado.' },
];

const Process: React.FC = () => (
    <section className="relative bg-yp-deep text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-yp-bright blur-3xl opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 relative">
            <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
                <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-accent">
                        <span className="size-1.5 rounded-full bg-accent" /> CÓMO TRABAJAMOS
                    </div>
                    <h2 className="font-display font-black text-[40px] lg:text-[56px] leading-[1.02] mt-3 tracking-tight">
                        De la idea al producto en <span className="text-accent">4 pasos</span>.
                    </h2>
                </div>
                <div className="lg:col-span-5 text-white/70 text-[15px] leading-relaxed">
                    Un proceso simple, transparente y sin sorpresas. Acompañamos cada etapa para que tu pedido llegue
                    exactamente como lo imaginaste.
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
                {STEPS.map((s) => (
                    <div key={s.n} className="bg-yp-deep hover:bg-yp-mid/40 transition p-7 lg:p-9 group relative">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-[11px] tracking-[0.25em] text-white/40">PASO {s.n}</span>
                            <span className="font-display font-black text-2xl text-accent">{s.n}</span>
                        </div>
                        <div className="font-display font-extrabold text-3xl lg:text-4xl mb-3">{s.t}</div>
                        <p className="text-white/70 text-[14px] leading-relaxed max-w-[280px]">{s.d}</p>
                        <div className="mt-7 h-px bg-gradient-to-r from-accent via-white/20 to-transparent w-0 group-hover:w-full transition-all duration-700" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Process;
