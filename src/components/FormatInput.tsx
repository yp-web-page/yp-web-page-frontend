import React, { useState } from 'react';
import { 
  Control, 
  Controller, 
  FieldError, 
  FieldValues, 
  Path, 
  UseFormRegister 
} from 'react-hook-form';
import Button from './Button';
import Icon from './icon/Icon';

interface FormatInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type: "text" | "file" | "email" | "password" | "number" | "tel" | "checkbox";
    isRequired: boolean;
    register?: UseFormRegister<T>;
    control?: Control<T>;
    error?: FieldError;
    maxLength?: number;
    minLength?: number;
    length?: number;
    placeholder?: string;
    accept?: string;
    customButton?: boolean;
    className?: string;
    helperText?: string;
}

const FormatInput = <T extends FieldValues>(props: FormatInputProps<T>): React.ReactElement => {
    const {
        name,
        label,
        type,
        isRequired,
        register,
        control,
        error,
        maxLength,
        minLength,
        length,
        placeholder,
        accept = ".pdf",
        customButton = false,
        className = "w-full py-1 px-3 rounded-md bg-gray-200 text-gray-900 text-sm sm:text-base",
        helperText,
    } = props;
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);
    const errorClass = error ? "border border-red-500" : "";
    const helperId = `${name}-helper-text`;

    return(
        <div className="mb-2">
          {type !== "checkbox" && (
            <div className="flex justify-between items-center mb-0.5">
              <label htmlFor={name} className="text-gray-700 text-xs">
                {label}{isRequired && (<span className="text-red-500">*</span>)}
              </label>
              {typeof maxLength === "number" && (
                <span className="text-xs text-gray-500">
                    {length ?? 0}/{maxLength}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col">
            {type !== "file" && type !== "password" && type !== "checkbox" && register && (
              <div className="h-8">
                <input
                  id={name}
                  type={type}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  className={`${className} ${errorClass} h-full placeholder:text-sm`}
                  {...register(name)}
                />
                {helperText && (
                  <span id={helperId} className="text-xs text-gray-500 mt-1.5 block mb-3">
                    {helperText}
                  </span>
                )}
              </div>
            )}

            {type === "password" && register && (
              <div className="w-full">
                <div className="relative h-8">
                  <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className={`${className} ${errorClass} pr-10 h-full placeholder:text-sm`}
                    {...register(name)}
                  />
                  {customButton && type === "password" && (
                    <Button
                      type='button'
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none bg-transparent border-none p-0.5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                          <Icon 
                            name="eye"
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          />
                        ) : (
                          <Icon 
                            name="eyeoff"
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          />
                        )
                      }
                    </Button>
                  )}
                </div>
                {helperText && (
                  <span id={helperId} className="text-xs text-gray-500 mt-1.5 block mb-3">
                    {helperText}
                  </span>
                )}
              </div>
            )}

            {type === "checkbox" && (
              <div className="flex items-center">
                <input
                  type={type}
                  id={name}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3 w-4 text-[#4263EB] border-gray-300 rounded"
                />
                <label htmlFor={name} className="ml-2 text-gray-600">
                  {label}
                </label>
              </div>
            )}

            {type === "file" && control && (
              <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    {customButton ? (
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => document.getElementById(name)?.click()}
                          className="px-2 py-2 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors text-sm leading-none"
                        >
                          Seleccionar archivo
                        </Button>
                        <span className="text-gray-500 text-sm">
                          {value ? (value as File).name : "Ningún Archivo seleccionado"}
                        </span>
                        <input
                          id={name}
                          type="file"
                          className="hidden"
                          accept={accept}
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            onChange(file);
                          }}
                          {...rest}
                        />
                      </div>
                      ) : (
                        <input
                          id={name}
                          type="file"
                          className={`${className} ${errorClass}`}
                          accept={accept}
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            onChange(file);
                          }}
                          {...rest}
                        />
                      )}
                  </>
                )}
              />
            )}      
          </div>

          {error?.message && (
            <span className="text-red-500 text-xs mt-0.5 block">{error.message}</span>
          )}
        </div>
    );
}

export default FormatInput;