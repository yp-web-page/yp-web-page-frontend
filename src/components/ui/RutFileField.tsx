import React, { useRef, useState } from 'react';
import Icon from '../icon/Icon';
import Button from '../Button';

interface RutFileFieldProps {
    file: File | null;
    onChange: (f: File | null) => void;
    error?: string;
    accept?: string;
    maxSizeMB?: number;
    fieldLabel?: string;
}

const fileTypeLabel = (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'PDF';
    if (['jpg', 'jpeg'].includes(ext)) return 'JPG';
    if (ext === 'png') return 'PNG';
    if (ext === 'webp') return 'WebP';
    return ext.toUpperCase() || 'Archivo';
};

const RutFileField: React.FC<RutFileFieldProps> = ({
    file,
    onChange,
    error,
    accept = '.pdf,image/jpeg,image/png,image/webp',
    maxSizeMB = 5,
    fieldLabel = 'ADJUNTAR RUT · OBLIGATORIO',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (f?: File | null) => {
        if (!f) return;
        if (f.size > maxSizeMB * 1024 * 1024) return;
        onChange(f);
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    handleFile(e.target.files?.[0]);
                    e.target.value = '';
                }}
            />

            {file ? (
                <div className={`bg-white rounded-2xl border-2 ${error ? 'border-red-500' : 'border-emerald-500/40'} p-3.5 flex items-center gap-3`}>
                    <div className="size-10 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-600 shrink-0">
                        <Icon name="file" className="h-[18px] w-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13.5px] text-yp-deep truncate">{file.name}</div>
                        <div className="font-mono text-[10px] tracking-wider text-yp-muted mt-0.5">
                            {fileTypeLabel(file)} · {(file.size / 1024).toFixed(0)} KB
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => onChange(null)}
                        className="size-7 grid place-items-center rounded-lg text-yp-muted hover:text-red-500 hover:bg-yp-paper transition"
                        aria-label="Quitar archivo"
                    >
                        <Icon name="close" className="h-3.5 w-3.5" />
                    </Button>
                </div>
            ) : (
                <button
                    type="button"
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    onClick={() => inputRef.current?.click()}
                    className={`w-full rounded-2xl border-2 border-dashed transition p-4 flex items-center gap-3 text-left ${
                        dragging
                            ? 'border-yp-deep bg-yp-paper'
                            : error
                            ? 'border-red-500'
                            : 'border-yp-line bg-white hover:border-yp-bright/60 hover:bg-yp-paper'
                    }`}
                >
                    <div className="size-10 rounded-xl bg-accent grid place-items-center text-yp-deep shrink-0">
                        <Icon name="upload" className="h-[17px] w-[17px]" />
                    </div>
                    <div className="flex-1">
                        <div className="font-mono text-[10px] tracking-[0.2em] text-yp-bright uppercase mb-0.5">
                            {fieldLabel}
                        </div>
                        <div className="text-[13px] font-semibold text-yp-deep">
                            Arrastra aquí o haz click para buscar
                        </div>
                        <div className="text-[11px] text-yp-muted mt-0.5">
                            PDF, JPG, PNG, WebP · máx. {maxSizeMB} MB
                        </div>
                    </div>
                </button>
            )}

            {error && (
                <div className="mt-1 px-1 font-mono text-[10px] text-red-500 tracking-wide">{error}</div>
            )}
        </div>
    );
};

export default RutFileField;
