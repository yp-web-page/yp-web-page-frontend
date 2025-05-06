import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import FormatInput from "../../components/FormatInput";
import { useForm } from "react-hook-form";
import { GENERAL } from "../../constants/general";
import Button from "../../components/Button";
import useChangePassword from "../../hooks/useChangePassword";
import { useModal } from "../../context/ModalContext";
import { TypeNotification } from "../../types/TypeNotifcation";
import { ChangePassword as Payload } from "../../types/ChangePassword";
import { MESSAGE } from "../../constants/message";

interface ChangePasswordFormInputs {
    password: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const { mutate, isPending} = useChangePassword({navigate});

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => 
        openModal("notification", message, typeNotification);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch
    } = useForm<ChangePasswordFormInputs>();

    const passwordLength = (watch('password') || '').length;
    const confirmPasswordLength = (watch('confirmPassword') || '').length;

    const onSubmit = (data: ChangePasswordFormInputs) => {  
        if (data.password !== data.confirmPassword) {
            handleOpenNotification(MESSAGE.ERROR_PASSWORD_CHANGE_NOT_MATCH, "info");
            setTimeout(() => {
                closeModal();
            }, 5000);
            return;
        }

        const changePassword: Payload = {
            newPassword: data.password,
            token: token || ""
        };
        
        mutate({ changePassword });
    };

    return(
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center bg-gradient-to-b from-[#4da0ff] to-[#002f7f] justify-center items-center"
                style={{ backgroundImage: "url('/change_password_icon.jpg')" }}
            >
            </div>
  
            {/* Right Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-indigo-50">
                <img src="/logo_favicon.png " alt="Logo" className="h-16 mb-6" />
  
                <h2 className="text-2xl font-semibold mb-6 text-gray-500">Cambiar Contraseña</h2>
  
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
                    <FormatInput<ChangePasswordFormInputs>
                        name="password"
                        label="Contraseña"
                        type="password"
                        isRequired={true}
                        register={(name) => register(name, {
                            required: "Este campo es requerido",
                            minLength: {
                                value: GENERAL.MIN_PASSWORD_LENGTH,
                                message: `La contraseña debe tener al menos ${GENERAL.MIN_PASSWORD_LENGTH} caracteres`
                            },
                            maxLength: {
                                value: GENERAL.MAX_PASSWORD_LENGTH,
                                message: `La contraseña no puede tener más de ${GENERAL.MAX_PASSWORD_LENGTH} caracteres`
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                                message: "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
                            }
                        })}
                        error={errors.password}
                        maxLength={GENERAL.MAX_PASSWORD_LENGTH}
                        helperText={`La contraseña debe tener entre ${GENERAL.MIN_PASSWORD_LENGTH} y ${GENERAL.MAX_PASSWORD_LENGTH} caracteres, incluir mayúsculas, minúsculas y números`}
                        length={passwordLength}
                        placeholder="Ingrese su contraseña"
                        customButton={true}
                    />
                    <FormatInput<ChangePasswordFormInputs>
                        name="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        isRequired={true}
                        register={(name) => register(name, {
                            required: "Este campo es requerido",
                            minLength: {
                                value: GENERAL.MIN_PASSWORD_LENGTH,
                                message: `La contraseña debe tener al menos ${GENERAL.MIN_PASSWORD_LENGTH} caracteres`
                            },
                            maxLength: {
                                value: GENERAL.MAX_PASSWORD_LENGTH,
                                message: `La contraseña no puede tener más de ${GENERAL.MAX_PASSWORD_LENGTH} caracteres`
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                                message: "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
                            }
                        })}
                        error={errors.confirmPassword}
                        maxLength={GENERAL.MAX_PASSWORD_LENGTH}
                        helperText={`La contraseña debe tener entre ${GENERAL.MIN_PASSWORD_LENGTH} y ${GENERAL.MAX_PASSWORD_LENGTH} caracteres, incluir mayúsculas, minúsculas y números`}
                        length={confirmPasswordLength}
                        placeholder="Confirme su contraseña"
                        customButton={true}
                    />
  
                    <div className="flex gap-4">
                        <Button
                            type='submit'
                            className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient"
                            disabled={isPending}
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
  
                <p className="text-xs text-gray-500 mt-6">
                    Esta es la página de cambio de contraseña de Yanca.
                </p>
            </div>
        </div>
    );
};

export default ChangePassword;