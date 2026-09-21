import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SplitScreen from '../../components/SplitScreen';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import Skeleton from '../../components/ui/Skeleton';
import FloatField from '../../components/ui/FloatField';
import FloatSelect from '../../components/ui/FloatSelect';
import RutFileField from '../../components/ui/RutFileField';
import { serviceCustomer, type UpdateCustomerProfileParams } from '../../services/serviceCustomer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Icon from '../../components/icon/Icon';
import axios from 'axios';

interface ProfileFormInputs {
    name: string;
    type: 'person' | 'company';
    documentType: string;
    taxId: string;
    phone: string;
    street: string;
    city: string;
    department: string;
    invoicingEmail: string;
    fiscalRegime: string;
}

const DOCUMENT_TYPES: { code: string; label: string }[] = [
    { code: '13', label: 'Cédula de ciudadanía' },
    { code: '31', label: 'NIT' },
    { code: '12', label: 'Tarjeta de identidad' },
    { code: '11', label: 'Registro civil' },
    { code: '22', label: 'Cédula de extranjería' },
    { code: '21', label: 'Tarjeta de extranjería' },
    { code: '41', label: 'Pasaporte' },
    { code: '42', label: 'Doc. de identificación extranjero' },
    { code: '47', label: 'PEP' },
    { code: '48', label: 'PPT' },
    { code: '91', label: 'NUIP' },
    { code: '50', label: 'NIT de otro país' },
    { code: '10', label: 'Registro mercantil' },
];

const FISCAL_RESPONSIBILITIES: { code: string; label: string }[] = [
    { code: 'O-13', label: 'Gran contribuyente' },
    { code: 'O-15', label: 'Autorretenedor' },
    { code: 'O-23', label: 'Agente de retención IVA' },
    { code: 'O-47', label: 'Régimen tributario especial' },
    { code: 'R-99-PN', label: 'No aplica' },
];

const MAX_RUT_ATTEMPTS = 5;

const RUT_ERROR_MESSAGES: Record<string, string> = {
    not_a_rut: 'El documento no es un RUT (formulario DIAN 001). Verifica que sea el documento correcto.',
    file_too_large: 'El archivo es demasiado grande. Máximo 5 MB.',
    file_type_not_allowed: 'Tipo de archivo no permitido. Usa PDF, JPG, PNG o WebP.',
    unreadable_pdf: 'El PDF no se pudo leer. Verifica que no esté dañado o protegido.',
    model_unavailable: 'El servicio de validación no está disponible. Inténtalo más tarde.',
    not_configured: 'La validación de documentos no está habilitada en este momento. Contacta al soporte.',
};

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="font-mono text-[9.5px] tracking-[0.25em] text-yp-muted mb-2.5">{children}</div>
);

const TypeButton: React.FC<{
    active: boolean;
    icon: 'user' | 'building';
    label: string;
    desc: string;
    onClick: () => void;
}> = ({ active, icon, label, desc, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`relative px-3 py-2.5 rounded-xl text-left transition-all ${
            active ? 'bg-yp-deep text-white' : 'text-yp-ink hover:bg-white'
        }`}
    >
        <div className="flex items-center gap-2.5">
            <div className={`size-7 grid place-items-center rounded-lg ${active ? 'bg-accent text-yp-deep' : 'bg-yp-line/50 text-yp-muted'}`}>
                <Icon name={icon} className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
                <div className={`font-display font-bold text-[13.5px] ${active ? 'text-white' : 'text-yp-deep'}`}>{label}</div>
                <div className={`text-[10.5px] font-mono tracking-wider uppercase ${active ? 'text-accent' : 'text-yp-muted'}`}>{desc}</div>
            </div>
        </div>
    </button>
);

const ProfilePage: React.FC = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['customer-profile'],
        queryFn: serviceCustomer.getCustomerProfile,
        enabled: isAuthenticated,
        staleTime: 0,
        gcTime: 0,
    });

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (params: UpdateCustomerProfileParams) => serviceCustomer.updateCustomerProfile(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
        },
    });


    // fiscalResponsibilities is managed outside react-hook-form since it's a string[]
    const [fiscalResponsibilities, setFiscalResponsibilities] = useState<string[]>([]);

    // RUT state
    const [rutFile, setRutFile] = useState<File | null>(null);
    const [rutState, setRutState] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
    const [rutError, setRutError] = useState<string | null>(null);
    const [rutAttemptsLeft, setRutAttemptsLeft] = useState<number>(MAX_RUT_ATTEMPTS);
    const rutAbortRef = useRef<AbortController | null>(null);

    const { handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm<ProfileFormInputs>({
        defaultValues: {
            name: '', type: 'person', documentType: '', taxId: '',
            phone: '', street: '', city: '', department: '',
            invoicingEmail: '', fiscalRegime: '',
        },
    });

    const v = watch();

    useEffect(() => {
        if (!isAuthenticated && !isAuthLoading) navigate('/');
    }, [isAuthenticated, isAuthLoading, navigate]);

    useEffect(() => {
        if (profile) {
            reset({
                name: profile.name ?? '',
                type: (profile.type as 'person' | 'company') ?? 'person',
                documentType: profile.documentType ?? '',
                taxId: profile.taxId ?? '',
                phone: profile.phone ?? '',
                street: (profile.address as { street?: string })?.street ?? '',
                city: (profile.address as { city?: string })?.city ?? '',
                department: (profile.address as { department?: string })?.department ?? '',
                invoicingEmail: profile.invoicingEmail ?? '',
                fiscalRegime: profile.fiscalRegime ?? '',
            });
            setFiscalResponsibilities(profile.fiscalResponsibilities ?? []);
            setRutAttemptsLeft(profile.rutAttemptsLeft ?? MAX_RUT_ATTEMPTS);
        }
    }, [profile, reset]);

    const onSubmit = (data: ProfileFormInputs) => {
        updateProfile({
            name: data.name,
            type: data.type,
            documentType: data.documentType || null,
            taxId: data.taxId || null,
            phone: data.phone || null,
            address: { street: data.street, city: data.city, department: data.department },
            invoicingEmail: data.invoicingEmail || null,
            fiscalRegime: (data.fiscalRegime as '48' | '49') || null,
            fiscalResponsibilities: fiscalResponsibilities.length > 0 ? fiscalResponsibilities as ('O-13' | 'O-15' | 'O-23' | 'O-47' | 'R-99-PN')[] : null,
        });
    };

    const handleRutUpload = async (file: File) => {
        rutAbortRef.current?.abort();
        const controller = new AbortController();
        rutAbortRef.current = controller;
        setRutState('validating');
        setRutError(null);
        try {
            const result = await serviceCustomer.submitRut(file, controller.signal);
            if (result.valid) {
                setRutState('success');
                setRutFile(null);
                queryClient.invalidateQueries({ queryKey: ['customer-profile'] });
            } else {
                setRutState('error');
                setRutAttemptsLeft(result.attemptsLeft);
                setRutError(RUT_ERROR_MESSAGES[result.code] ?? 'El documento no es válido.');
                if (result.disabled) useAuthStore.getState().logout();
            }
        } catch (err) {
            if (axios.isCancel(err)) return;
            setRutState('idle');
            setRutError('No se pudo enviar el documento. Intenta de nuevo.');
        }
    };

    const toggleResponsibility = (code: string) => {
        setFiscalResponsibilities((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
        );
    };

    const isWholesale = profile?.segment === 'wholesale';
    const rutVerified = profile?.rutVerified === true;
    const isProfileLocked = profile?.profileComplete === true;

    const rightContent = (): React.ReactElement => {
        if (isLoading) return <Skeleton />;

        return (
            <div className="w-full max-w-[440px] mx-auto py-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <img src="/logo_favicon.png" alt="Logo" className="h-10" />
                    <div>
                        <div className="font-mono text-[10.5px] tracking-[0.3em] text-yp-bright">MI CUENTA</div>
                        <h1 className="font-display font-black text-[26px] leading-[1.02] tracking-tight text-yp-deep">
                            Mi perfil.
                        </h1>
                    </div>
                </div>

                {/* Read-only chips */}
                <div className="flex gap-2 mb-5">
                    <div className="flex-1 bg-yp-paper rounded-xl px-3 py-2 border border-yp-line">
                        <div className="font-mono text-[9px] tracking-[0.2em] text-yp-muted uppercase mb-0.5">
                            Correo de acceso
                        </div>
                        <div className="text-[13px] font-semibold text-yp-deep truncate">
                            {profile?.email ?? '—'}
                        </div>
                    </div>
                    <div className="bg-yp-paper rounded-xl px-3 py-2 border border-yp-line">
                        <div className="flex items-center gap-1 mb-0.5">
                            <div className="font-mono text-[9px] tracking-[0.2em] text-yp-muted uppercase">
                                Tipo de cuenta
                            </div>
                            <Icon name="lock" className="h-2.5 w-2.5 text-yp-muted" />
                        </div>
                        <div className="text-[13px] font-semibold text-yp-deep">
                            {profile?.segment === 'wholesale' ? 'Publicista' : 'Regular'}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* DOCUMENTO RUT — solo publicistas */}
                    {isWholesale && (
                        <div>
                            <SectionLabel>DOCUMENTO RUT</SectionLabel>

                            {rutVerified ? (
                                <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                                    <div className="size-8 rounded-xl bg-emerald-500/15 grid place-items-center text-emerald-600 shrink-0">
                                        <Icon name="check" className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-semibold text-emerald-700">RUT verificado</div>
                                        <div className="font-mono text-[10px] tracking-wider text-emerald-600/70 mt-0.5">
                                            Tu documento ha sido validado correctamente.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-[12.5px] text-yp-muted leading-relaxed mb-3">
                                        Para operar como publicista adjunta tu RUT (formulario DIAN 001).
                                        {rutAttemptsLeft < MAX_RUT_ATTEMPTS && (
                                            <span className="block mt-1 font-mono text-[10.5px] tracking-wide text-orange-600 uppercase">
                                                Te quedan {rutAttemptsLeft} intento{rutAttemptsLeft !== 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </p>

                                    {rutState === 'validating' ? (
                                        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-yp-paper border border-yp-line">
                                            <svg className="animate-spin h-4 w-4 text-yp-bright shrink-0" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                                                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            <span className="text-[13px] font-semibold text-yp-deep">Verificando documento…</span>
                                        </div>
                                    ) : (
                                        <RutFileField
                                            file={rutFile}
                                            onChange={(f) => {
                                                setRutFile(f);
                                                if (f) {
                                                    setRutError(null);
                                                    handleRutUpload(f);
                                                } else {
                                                    setRutError(null);
                                                    setRutState('idle');
                                                }
                                            }}
                                            error={rutError ?? undefined}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {/* 01 · CONTACTO */}
                    <div>
                        <SectionLabel>01 · CONTACTO</SectionLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FloatField
                                id="name"
                                label="Nombre / Empresa"
                                iconName="user"
                                value={v.name || ''}
                                onChange={(val) => setValue('name', val, { shouldDirty: true })}
                                error={errors.name?.message}
                                maxLen={255}
                            />
                            <FloatField
                                id="phone"
                                label="Celular"
                                iconName="phone"
                                prefix="+57"
                                onlyNumbers
                                value={v.phone || ''}
                                onChange={(val) => setValue('phone', val, { shouldDirty: true })}
                                maxLen={10}
                            />
                        </div>
                    </div>

                    {/* 02 · IDENTIFICACIÓN */}
                    <div>
                        <div className="flex items-center gap-2 mb-2.5">
                            <SectionLabel>02 · IDENTIFICACIÓN</SectionLabel>
                            {isProfileLocked && (
                                <Icon name="lock" className="h-3 w-3 text-yp-muted mb-2.5" />
                            )}
                        </div>
                        <div className={`grid grid-cols-2 gap-2 p-1 bg-yp-paper rounded-2xl border border-yp-line mb-3 ${isProfileLocked ? 'opacity-60 pointer-events-none' : ''}`}>
                            <TypeButton
                                active={v.type === 'person'}
                                icon="user"
                                label="Persona"
                                desc="Natural"
                                onClick={() => !isProfileLocked && setValue('type', 'person', { shouldDirty: true })}
                            />
                            <TypeButton
                                active={v.type === 'company'}
                                icon="building"
                                label="Empresa"
                                desc="Jurídica"
                                onClick={() => !isProfileLocked && setValue('type', 'company', { shouldDirty: true })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <FloatSelect
                                id="documentType"
                                label="Tipo de documento"
                                iconName="fileText"
                                value={v.documentType || ''}
                                onChange={(val) => setValue('documentType', val, { shouldDirty: true })}
                                disabled={isProfileLocked}
                            >
                                <option value="" disabled />
                                {DOCUMENT_TYPES.map(({ code, label }) => (
                                    <option key={code} value={code}>{label}</option>
                                ))}
                            </FloatSelect>
                            <FloatField
                                id="taxId"
                                label="Número de documento"
                                iconName="fileText"
                                value={v.taxId || ''}
                                onChange={(val) => setValue('taxId', val, { shouldDirty: true })}
                                maxLen={64}
                                disabled={isProfileLocked}
                            />
                        </div>
                    </div>

                    {/* 03 · DIRECCIÓN */}
                    <div>
                        <SectionLabel>03 · DIRECCIÓN</SectionLabel>
                        <div className="space-y-3">
                            <FloatField
                                id="street"
                                label="Calle, carrera, avenida…"
                                iconName="map"
                                value={v.street || ''}
                                onChange={(val) => setValue('street', val, { shouldDirty: true })}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <FloatField
                                    id="city"
                                    label="Ciudad"
                                    iconName="map"
                                    value={v.city || ''}
                                    onChange={(val) => setValue('city', val, { shouldDirty: true })}
                                />
                                <FloatField
                                    id="department"
                                    label="Departamento"
                                    iconName="map"
                                    value={v.department || ''}
                                    onChange={(val) => setValue('department', val, { shouldDirty: true })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 04 · FACTURACIÓN */}
                    <div>
                        <SectionLabel>04 · FACTURACIÓN</SectionLabel>
                        <div className="space-y-3">
                            <FloatField
                                id="invoicingEmail"
                                label="Email de facturación"
                                iconName="mail"
                                type="email"
                                value={v.invoicingEmail || ''}
                                onChange={(val) => setValue('invoicingEmail', val, { shouldDirty: true })}
                                error={errors.invoicingEmail?.message}
                            />

                            <FloatSelect
                                id="fiscalRegime"
                                label="Régimen fiscal"
                                iconName="shield"
                                value={v.fiscalRegime || ''}
                                onChange={(val) => setValue('fiscalRegime', val, { shouldDirty: true })}
                            >
                                <option value="" disabled />
                                <option value="48">Responsable de IVA</option>
                                <option value="49">No responsable de IVA</option>
                            </FloatSelect>

                            <div>
                                <div className="font-mono text-[9px] tracking-[0.2em] text-yp-muted uppercase mb-2">
                                    Responsabilidades fiscales
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {FISCAL_RESPONSIBILITIES.map(({ code, label }) => {
                                        const active = fiscalResponsibilities.includes(code);
                                        return (
                                            <button
                                                key={code}
                                                type="button"
                                                onClick={() => toggleResponsibility(code)}
                                                className={`px-3 py-1.5 rounded-xl text-[11.5px] font-semibold border transition-all ${
                                                    active
                                                        ? 'bg-yp-deep text-white border-yp-deep'
                                                        : 'bg-white text-yp-muted border-yp-line hover:border-yp-bright/50 hover:text-yp-deep'
                                                }`}
                                            >
                                                {active && (
                                                    <Icon name="check" className="inline h-3 w-3 mr-1 mb-0.5" />
                                                )}
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guardar cambios */}
                    <div className="pt-1">
                        <Button
                            type="submit"
                            disabled={isPending || !isDirty}
                            className={`w-full group relative overflow-hidden font-bold text-[13px] tracking-[0.12em] uppercase py-3.5 rounded-2xl transition flex items-center justify-center gap-2.5 ${
                                isPending || !isDirty
                                    ? 'bg-yp-line/50 text-yp-muted cursor-not-allowed'
                                    : 'bg-yp-deep hover:bg-yp-mid text-white'
                            }`}
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                    </svg>
                                    Guardando…
                                </>
                            ) : (
                                <>
                                    Guardar cambios
                                    <span className={`size-6 rounded-full grid place-items-center transition ${!isDirty ? 'bg-white/40 text-yp-muted' : 'bg-accent text-yp-deep group-hover:translate-x-0.5'}`}>
                                        <Icon name="check" className="h-3 w-3" />
                                    </span>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <SplitScreen
            leftImage="/change_password_icon.jpg"
            leftImageAlt="Profile Image"
            rightContent={rightContent()}
        />
    );
};

export default ProfilePage;
