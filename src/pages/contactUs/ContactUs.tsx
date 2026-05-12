import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/icon/Icon';
import Button from '../../components/Button';
import ContactMap from '../../components/map/ContactMap';
import { CONTACT_INFO, SOCIAL_NETWORKS } from '../../constants/social_networks';

type Channel = {
    icon: string;
    title: string;
    lead: string;
    sub: string;
    href: string;
    cta: string;
    accent?: boolean;
};

const CHANNELS: Channel[] = [
    { icon: 'phone', title: 'Líneas de Atención', lead: `Tel. ${CONTACT_INFO.PHONE}`, sub: 'Atención directa', href: CONTACT_INFO.PHONE_HREF, cta: 'Llamar' },
    { icon: 'whatsapp', title: 'WhatsApp', lead: CONTACT_INFO.WHATSAPP_NUMBER, sub: 'Cotizaciones inmediatas', href: CONTACT_INFO.WHATSAPP_HREF, cta: 'Chatear', accent: true },
    { icon: 'mail', title: 'Email', lead: CONTACT_INFO.EMAIL, sub: 'Dudas y cotizaciones', href: CONTACT_INFO.EMAIL_HREF, cta: 'Escribir' },
    { icon: 'map', title: 'Visítanos', lead: CONTACT_INFO.CITY, sub: 'Atención en sede física', href: 'https://maps.google.com/?q=Yanca+Publicidad+Cali', cta: 'Ver mapa' },
];

const HOURS = [
    { d: 'Lunes a Viernes', h: '9:00 am — 1:00 pm · 2:00 pm — 5:30 pm' },
    { d: 'Sábados', h: '9:00 am — 2:00 pm' },
    { d: 'Domingos y festivos', h: 'Cerrado' },
];

const ASUNTOS = ['Cotización', 'Información', 'Visita', 'Otro'] as const;
type Asunto = (typeof ASUNTOS)[number];

const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
    <label className="font-mono text-[10.5px] tracking-[0.22em] text-yp-muted uppercase">
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
);

const Field: React.FC<{
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    required?: boolean;
}> = ({ label, type = 'text', value, onChange, placeholder, required }) => (
    <div>
        <Label required={required}>{label}</Label>
        <input
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-2 w-full bg-yp-paper border border-yp-line rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-yp-bright transition"
        />
    </div>
);

const ContactUs: React.FC = () => {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        asunto: 'Cotización' as Asunto,
        mensaje: '',
    });

    const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
        setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    const reset = () => {
        setSent(false);
        setForm({ nombre: '', empresa: '', email: '', telefono: '', asunto: 'Cotización', mensaje: '' });
    };

    return (
        <>
            <Helmet>
                <title>Contáctanos | Yanca Publicidad</title>
                <meta name="description" content="Contáctanos por teléfono, WhatsApp, correo o visítanos en Cali." />
            </Helmet>

            <main className="bg-yp-paper">
                {/* HERO */}
                <section className="yp-gradient-radial text-white relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-accent opacity-20 blur-3xl" />
                    <div className="relative max-w-[1400px] mx-auto px-6 py-20 lg:py-24">
                        <div className="font-mono text-[11px] tracking-[0.25em] text-accent mb-4">
                            ¿TIENES ALGUNA CONSULTA?
                        </div>
                        <h1 className="font-display font-black text-[44px] lg:text-[76px] leading-[0.95] tracking-tight max-w-[900px]">
                            Estamos aquí <br />
                            <span className="text-accent">para ayudarte.</span>
                        </h1>
                        <p className="mt-6 text-white/75 text-[16px] max-w-[560px] leading-relaxed">
                            Más de 20 años de experiencia en publicidad y marcación. Contáctanos por teléfono, WhatsApp,
                            correo o visítanos en Cali.
                        </p>
                    </div>
                </section>

                {/* CHANNELS */}
                <section className="max-w-[1400px] mx-auto px-6 -mt-12 lg:-mt-16 relative">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                        {CHANNELS.map((c, i) => (
                            <a
                                key={c.title}
                                href={c.href}
                                target={c.href.startsWith('http') ? '_blank' : undefined}
                                rel="noreferrer"
                                className={`group rounded-3xl border p-6 card-shadow transition hover:-translate-y-1 duration-300 ${
                                    c.accent ? 'bg-yp-deep text-white border-yp-deep' : 'bg-white border-yp-line'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`size-12 rounded-2xl grid place-items-center ${
                                            c.accent ? 'bg-accent text-yp-deep' : 'bg-yp-paper text-yp-deep'
                                        }`}
                                    >
                                        <Icon name={c.icon} className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" />
                                    </div>
                                    <div className={`font-mono text-[10px] tracking-[0.22em] ${c.accent ? 'text-white/55' : 'text-yp-muted'}`}>
                                        0{i + 1}
                                    </div>
                                </div>
                                <div className={`mt-5 font-mono text-[10.5px] tracking-[0.22em] uppercase ${c.accent ? 'text-accent' : 'text-yp-bright'}`}>
                                    {c.title}
                                </div>
                                <div className={`font-display font-extrabold text-[18px] mt-1 leading-tight ${c.accent ? 'text-white' : 'text-yp-deep'}`}>
                                    {c.lead}
                                </div>
                                <div className={`text-[12.5px] mt-1 ${c.accent ? 'text-white/65' : 'text-yp-muted'}`}>
                                    {c.sub}
                                </div>
                                <div className={`mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold ${c.accent ? 'text-accent' : 'text-yp-deep'}`}>
                                    {c.cta}
                                    <Icon name="arrowRight" className="h-3 w-3" />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* FORM + SIDEBAR */}
                <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                        <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3">
                            FORMULARIO DE CONTACTO
                        </div>
                        <h2 className="font-display font-black text-[34px] lg:text-[44px] leading-[1.02] text-yp-deep tracking-tight">
                            Cuéntanos qué necesitas.
                        </h2>
                        <p className="mt-3 text-[14.5px] text-yp-muted max-w-[520px]">
                            Respondemos en menos de 1 hora hábil. Sin compromiso y completamente personalizado.
                        </p>

                        {sent ? (
                            <div className="mt-8 rounded-3xl bg-white border border-yp-line p-8 card-shadow">
                                <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 grid place-items-center">
                                    <Icon name="check" className="h-5 w-5" />
                                </div>
                                <div className="font-display font-extrabold text-[22px] text-yp-deep mt-4">
                                    ¡Mensaje enviado!
                                </div>
                                <p className="mt-2 text-[14px] text-yp-ink">
                                    Te respondemos en menos de 1 hora hábil. Mientras, puedes seguirnos en redes o
                                    escribirnos directamente al WhatsApp.
                                </p>
                                <Button
                                    type="button"
                                    onClick={reset}
                                    className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-yp-bright hover:text-yp-deep"
                                >
                                    Enviar otro mensaje
                                    <Icon name="arrowRight" className="h-3 w-3" />
                                </Button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 bg-white rounded-3xl border border-yp-line p-6 lg:p-8 card-shadow grid gap-5"
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Nombre completo" required value={form.nombre} onChange={(v) => update('nombre', v)} placeholder="Tu nombre" />
                                    <Field label="Empresa" value={form.empresa} onChange={(v) => update('empresa', v)} placeholder="Opcional" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Correo electrónico" type="email" required value={form.email} onChange={(v) => update('email', v)} placeholder="tu@correo.com" />
                                    <Field label="Teléfono / WhatsApp" type="tel" value={form.telefono} onChange={(v) => update('telefono', v)} placeholder="3xx xxx xxxx" />
                                </div>
                                <div>
                                    <Label>Asunto</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {ASUNTOS.map((a) => (
                                            <Button
                                                type="button"
                                                key={a}
                                                onClick={() => update('asunto', a)}
                                                className={`px-4 py-2 rounded-full text-[12.5px] font-semibold border transition ${
                                                    form.asunto === a
                                                        ? 'bg-yp-deep text-white border-yp-deep'
                                                        : 'bg-white text-yp-ink border-yp-line hover:border-yp-deep/40'
                                                }`}
                                            >
                                                {a}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label required>Mensaje</Label>
                                    <textarea
                                        required
                                        value={form.mensaje}
                                        onChange={(e) => update('mensaje', e.target.value)}
                                        rows={5}
                                        placeholder="Cuéntanos qué necesitas — material, cantidad, fecha de entrega, etc."
                                        className="mt-2 w-full bg-yp-paper border border-yp-line rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-yp-bright transition"
                                    />
                                </div>
                                <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                                    <div className="text-[11.5px] font-mono tracking-wide text-yp-muted">
                                        RESPUESTA &lt; 1 HORA HÁBIL · SIN COMPROMISO
                                    </div>
                                    <Button
                                        type="submit"
                                        className="inline-flex items-center gap-2 bg-yp-deep hover:bg-yp-mid text-white font-bold text-[13.5px] tracking-wide px-6 py-3.5 rounded-full transition"
                                    >
                                        ENVIAR MENSAJE
                                        <Icon name="arrowRight" className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>

                    <aside className="lg:col-span-5 space-y-5">
                        {/* Hours */}
                        <div className="bg-yp-deep text-white rounded-3xl p-7 lg:p-8 card-shadow relative overflow-hidden">
                            <div className="absolute inset-0 grid-bg opacity-40" />
                            <div className="relative">
                                <div className="font-mono text-[10.5px] tracking-[0.25em] text-accent mb-3">
                                    HORARIOS DE ATENCIÓN
                                </div>
                                <h3 className="font-display font-black text-[26px] leading-tight">
                                    Cuándo encontrarnos.
                                </h3>
                                <ul className="mt-6 divide-y divide-white/10">
                                    {HOURS.map((h) => (
                                        <li key={h.d} className="py-3.5 flex items-start justify-between gap-4">
                                            <div className="font-semibold text-[14px]">{h.d}</div>
                                            <div className={`text-[12.5px] text-right ${h.h === 'Cerrado' ? 'text-red-400' : 'text-white/75'}`}>
                                                {h.h}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[12.5px] text-white/80">Disponibles ahora en WhatsApp</span>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-3xl border border-yp-line overflow-hidden card-shadow">
                            <ContactMap />
                        </div>

                        {/* Social */}
                        <div className="bg-white rounded-3xl border border-yp-line p-6 card-shadow">
                            <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3">SÍGUENOS</div>
                            <div className="font-display font-bold text-[16px] text-yp-deep">Conéctate con nosotros</div>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {[
                                    { name: 'facebook', label: 'FACEBOOK', href: SOCIAL_NETWORKS.FACEBOOK },
                                    { name: 'instagram', label: 'INSTAGRAM', href: SOCIAL_NETWORKS.INSTAGRAM },
                                    { name: 'whatsapp', label: 'WHATSAPP', href: SOCIAL_NETWORKS.WHATSAPP },
                                ].map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-yp-paper hover:bg-yp-deep hover:text-accent transition text-yp-deep"
                                    >
                                        <Icon name={s.name} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                        <span className="font-mono text-[10px] tracking-wide">{s.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default ContactUs;
