import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useForm } from "react-hook-form";
import FormatInput from "../FormatInput";
import Button from "../Button";
import useRecoverPassword from "../../hooks/userRecoverPassword";
import { RecoverPassword } from "../../types/RecoverPassword";

interface RecoverPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RecoverPasswordProps {
    username: string;
}

const RecoverPasswordModal: React.FC<RecoverPasswordModalProps> = ({ isOpen, onClose }) => {

    const { mutate } = useRecoverPassword();
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
    } = useForm<RecoverPasswordProps>();

    const resetForm = () => {
        reset({}, {
          keepErrors: false,
          keepDirty: false,
          keepTouched: false,
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const onSubmit = (data: RecoverPasswordProps) => {
        if (data.username) {
            const recoverPasswordData: RecoverPassword = {
                username: data.username,
            };
            mutate({ recoverPassword: recoverPasswordData });
        }
        handleClose();
    }

    return(
        <ModalWrapper
            isOpen={isOpen}
            onClose={handleClose}
            showIcon={false}
            childrenWrapperClassName="w-full max-w-[95%] sm:max-w-md mx-auto rounded-xl sm:rounded-2xl bg-white shadow-xl overflow-hidden relative pt-5 sm:pt-8"
        >
            <div className="space-y-0">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">
                        Recuperar Contraseña
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[300px] mx-auto space-y-2 py-3">
                        <FormatInput<RecoverPasswordProps>
                            name="username"
                            label="Nombre de Usuario"
                            type="text"
                            isRequired={true}
                            register={(name) => register(name, { 
                                required: "Este campo es requerido",
                            })}
                            error={errors.username}
                            placeholder="Ingrese su nombre de Usuario"
                        />
                        <Button
                            type='submit'
                            className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient"
                        >
                            Recuperar Contraseña
                        </Button>
                    </form>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default RecoverPasswordModal;