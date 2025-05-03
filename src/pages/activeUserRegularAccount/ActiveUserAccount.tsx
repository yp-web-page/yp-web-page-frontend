import React, { useCallback, useMemo } from "react";
import Button from "../../components/Button";
import { ActiveRegularAccount } from "../../types/ActiveRegularAccount";
import { useNavigate } from "react-router";
import useActiveRegularAccount from "../../hooks/useActiveRegularAccount";
import userResendActivationEmail from "../../hooks/useResendActivationEmail";
import { MESSAGE } from "../../constants/message";

const ActiveUserAccount: React.FC = () => {

    const { username, token } = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return {
          username: params.get('username') || '',
          token: params.get('token') || ''
        };
      }, []);
    const navigate = useNavigate();
    const stableNavigate = useCallback((path: string) =>  navigate(path), [navigate]);

    const acitveUserAccount: ActiveRegularAccount = useMemo(() => ({
        username: username || "",
        token: token || ""
    }), [username, token]);

    const { mutate: mutateActivationAccount, isPending: isPendingForActivation, isError: isErrorForActivation } = useActiveRegularAccount({ navigate: stableNavigate });
    const { mutate: mutateResendActivationEmail, isPending: isPendingForResend, isError: isErrorForResend } = userResendActivationEmail({ navigate: stableNavigate });

    const onSubmitActiveAccount = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            mutateActivationAccount({ activeRegularAccount: acitveUserAccount });
        }, 
        [mutateActivationAccount, acitveUserAccount]
    );

    const onSubmitResendActivationEmail = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            mutateResendActivationEmail({ activeRegularAccount: acitveUserAccount });
        }
        ,
        [mutateResendActivationEmail, acitveUserAccount]
    );

    return(
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Image Section */} 
            <div className="hidden md:flex md:w-1/2 bg-cover bg-center bg-gradient-to-b from-[#4da0ff] to-[#002f7f] justify-center items-center"
                style={{ backgroundImage: "url('/change_password_icon.jpg')" }}>
            </div>
            {/* Right Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-indigo-50 text-xs text-gray-500">
                <img src="/logo_favicon.png " alt="Logo" className="h-16 mb-6" />

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-500 text-center leading-tight max-w-[90%]">
                    Activación de cuenta
                </h2>
                <p className="text-sm md:text-base mt-4 text-center">
                    ¡Hola <strong>{username}</strong>! 🎉
                </p>
                <p className="text-sm md:text-base mt-2 text-center">
                    Estás a un paso de activar tu cuenta. Solo necesitas hacer clic en el siguiente botón para completar el proceso:
                </p>
                <Button
                    type="button"
                    onClick={onSubmitActiveAccount}
                    disabled={isPendingForActivation || isErrorForActivation}
                    className={isErrorForActivation ?  
                        "w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 bg-gray-500 text-white rounded-full font-bold text-sm mt-8"
                        : "w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 bg-gradient-to-b from-[#4da0ff] to-[#002f7f] text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity mt-8"
                    }
                >
                    Activar cuenta
                </Button>
                <p className="text-xs md:text-sm mt-6 max-w-sm">
                    Si no solicitaste esta cuenta, puedes ignorar este mensaje.
                </p>
                {isErrorForActivation && !(isErrorForResend || isPendingForResend) && (
                    <p className="text-xs md:text-sm mt-6 max-w-sm text-red-500 text-center">
                        {MESSAGE.ERROR_ACTIVATION_ACCOUNT_FOR_USER}
                    </p>
                )}
                { isErrorForActivation && (
                    <Button 
                    type="button"
                    onClick={onSubmitResendActivationEmail}
                    disabled={isPendingForResend}
                    className="w-[60%] mx-auto block py-2.5 bg-gradient-to-b from-[#4da0ff] to-[#002f7f] text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity mt-8"
                    >
                        Reenviar correo de activación
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ActiveUserAccount;