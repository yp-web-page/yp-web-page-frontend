import React, { useState } from 'react';
import Icon from '../icon/Icon';
import iconSvgMap from '../icon/iconMap';

type IconName = keyof typeof iconSvgMap;

export type FloatFieldProps = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    iconName: IconName;
    error?: string;
    maxLen?: number;
    showCounter?: boolean;
    right?: React.ReactNode;
    prefix?: string;
    onlyNumbers?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
};

const FloatField: React.FC<FloatFieldProps> = ({
    id, label, type = 'text', value, onChange, iconName, error,
    maxLen, showCounter, right, prefix, onlyNumbers, disabled, readOnly,
}) => {
    const [focused, setFocused] = useState(false);
    const filled = !!value;
    const float = focused || filled;
    const hasError = !!error;
    const isStatic = disabled || readOnly;

    const handleChange = (raw: string) => {
        if (isStatic) return;
        let v = raw;
        if (onlyNumbers) v = v.replace(/[^0-9]/g, '');
        if (maxLen) v = v.slice(0, maxLen);
        onChange(v);
    };

    return (
        <div>
            <div
                className={`relative rounded-2xl border transition-all ${
                    isStatic
                        ? 'bg-yp-paper border-yp-line'
                        : hasError
                        ? 'bg-white border-red-500'
                        : focused
                        ? 'bg-white border-yp-deep ring-4 ring-yp-deep/10'
                        : 'bg-white border-yp-line hover:border-yp-bright/40'
                }`}
            >
                <div className="flex items-center">
                    <div className={`pl-4 transition-colors ${hasError ? 'text-red-500' : focused ? 'text-yp-deep' : 'text-yp-muted'}`}>
                        <Icon name={iconName} className="h-[17px] w-[17px]" />
                    </div>
                    <div className="relative flex-1 pl-3 pr-3">
                        <label
                            htmlFor={id}
                            className={`absolute left-3 pointer-events-none transition-all ${
                                float
                                    ? `top-1.5 text-[9.5px] font-mono tracking-[0.15em] uppercase ${hasError ? 'text-red-500' : 'text-yp-bright'}`
                                    : 'top-1/2 -translate-y-1/2 text-[11px] text-yp-muted'
                            }`}
                        >
                            {label}
                        </label>
                        <div className="flex items-center pt-[22px] pb-2">
                            {prefix && float && (
                                <span className="text-[14px] font-semibold text-yp-muted mr-1.5 select-none">{prefix}</span>
                            )}
                            <input
                                id={id}
                                type={type}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                disabled={disabled}
                                readOnly={readOnly}
                                inputMode={onlyNumbers ? 'numeric' : undefined}
                                className="w-full bg-transparent outline-none text-[14px] font-semibold text-yp-deep pr-1 disabled:text-yp-muted read-only:text-yp-muted"
                            />
                        </div>
                    </div>
                    {right && <div className="pr-3">{right}</div>}
                </div>
            </div>
            <div className="mt-1.5 px-1 flex items-start justify-between gap-3 min-h-[14px]">
                <div className="flex-1">
                    {hasError && <div className="font-mono text-[10.5px] text-red-500 tracking-wide">{error}</div>}
                </div>
                {showCounter && maxLen && (
                    <div className={`font-mono text-[10px] tracking-wider shrink-0 ${value.length >= maxLen ? 'text-red-500' : 'text-yp-muted'}`}>
                        {value.length}/{maxLen}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatField;
