import React, { useState } from 'react';
import Icon from '../icon/Icon';
import iconSvgMap from '../icon/iconMap';

type IconName = keyof typeof iconSvgMap;

export type FloatSelectProps = {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    iconName: IconName;
    error?: string;
    disabled?: boolean;
    children: React.ReactNode;
};

const FloatSelect: React.FC<FloatSelectProps> = ({
    id, label, value, onChange, iconName, error, disabled, children,
}) => {
    const [focused, setFocused] = useState(false);
    const filled = !!value;
    const float = focused || filled;
    const hasError = !!error;

    return (
        <div>
            <div
                className={`relative rounded-2xl border transition-all ${
                    disabled
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
                            className={`absolute left-3 pointer-events-none transition-all z-10 ${
                                float
                                    ? `top-1.5 text-[9.5px] font-mono tracking-[0.15em] uppercase ${hasError ? 'text-red-500' : 'text-yp-bright'}`
                                    : 'top-1/2 -translate-y-1/2 text-[11px] text-yp-muted'
                            }`}
                        >
                            {label}
                        </label>
                        <select
                            id={id}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            disabled={disabled}
                            className="w-full bg-transparent outline-none text-[14px] font-semibold text-yp-deep pt-[22px] pb-2 pr-1 disabled:text-yp-muted appearance-none"
                        >
                            {children}
                        </select>
                    </div>
                    <div className="pr-4 text-yp-muted pointer-events-none">
                        <Icon name="chevronRight" className="h-3.5 w-3.5 rotate-90" />
                    </div>
                </div>
            </div>
            <div className="mt-1.5 px-1 min-h-[14px]">
                {hasError && <div className="font-mono text-[10.5px] text-red-500 tracking-wide">{error}</div>}
            </div>
        </div>
    );
};

export default FloatSelect;
