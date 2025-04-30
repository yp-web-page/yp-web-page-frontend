import { useAuth } from '../../context/AuthContext';
import ModalWrapper from './ModalWrapper';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import FormatInput from '../FormatInput';
import Icon from '../icon/Icon';
import { useModal } from '../../context/ModalContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

interface LoginFormInputs {
    username: string;
    password: string;
    rememberme: boolean;
}

const MAX_USERNAME_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
    const { login } = useAuth();
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch,
        reset,
      } = useForm<LoginFormInputs>();
      const { openModal } = useModal();

    const usernameLength = (watch('username') || '').length;
    const passwordLength = (watch('password') || '').length;

    const resetForm = () => {
        reset({}, {
          keepErrors: false,
          keepDirty: false,
          keepTouched: false,
        });
      };

    const onSubmit = async (_: LoginFormInputs) => {
        try {
            await login();
            onClose();
        } catch (error) {
            console.error('Login failed:', error);
        }
        resetForm
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleOpenRegister = () => {
        onClose();
        onSwitchToRegister();
    };
    
    const handleRecoverPassword = () => {
        openModal("Recover");
    };

    return (
        <ModalWrapper 
            isOpen={isOpen} 
            onClose={handleClose}
            showIcon={true}
            iconContent={
                <Icon 
                    name="user"
                    size={200}
                    className="text-white"
                    fill='currentColor'
                    viewBox="0 0 24 24"
                />
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">
                        INICIA SESION PARA COTIZAR TU PRODUCTO
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[300px] mx-auto space-y-2">
                    <FormatInput<LoginFormInputs>
                        name="username"
                        label="Nombre de Usuario"
                        type="text"
                        isRequired={true}
                        register={(name) => register(name, { 
                            required: "Este campo es requerido",
                            minLength: {
                                value: 5,
                                message: "El nombre de usuario debe tener al menos 5 caracteres"
                            },
                            maxLength: {
                                value: MAX_USERNAME_LENGTH,
                                message: `El valor máximo de caracteres es ${MAX_USERNAME_LENGTH}`
                            } 
                        })}
                        error={errors.username}
                        maxLength={MAX_USERNAME_LENGTH}
                        length={usernameLength}
                        placeholder="Ingrese su nombre de Usuario"
                    />

                    <FormatInput<LoginFormInputs>
                        name="password"
                        label="Contraseña"
                        type="password"
                        isRequired={true}
                        register={(name) => register(name, {
                            required: "Este campo es requerido",
                            minLength: {
                                value: MIN_PASSWORD_LENGTH,
                                message: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`
                            },
                            maxLength: {
                                value: MAX_PASSWORD_LENGTH,
                                message: `La contraseña no puede tener más de ${MAX_PASSWORD_LENGTH} caracteres`
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
                                message: "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
                            }
                        })}
                        error={errors.password}
                        maxLength={MAX_PASSWORD_LENGTH}
                        helperText={`La contraseña debe tener entre ${MIN_PASSWORD_LENGTH} y ${MAX_PASSWORD_LENGTH} caracteres, incluir mayúsculas, minúsculas y números`}
                        length={passwordLength}
                        placeholder="Ingrese su contraseña"
                        customButton={true}
                    />

                    <FormatInput<LoginFormInputs>
                        name="rememberme"
                        label="Recuerdame"
                        type="checkbox"
                        isRequired={false}
                        register={(name) => register(name)}
                        className="h-4 w-4 text-[#4263EB] border-gray-300 rounded"
                    />

                    <Button
                        type='submit'
                        className="w-[60%] mx-auto block py-2.5 bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity mt-8"
                    >
                        Ingresar
                    </Button>
                </form>

                <div className="pt-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <Button
                        type="button"
                        onClick={handleOpenRegister}
                        className="px-2 py-1 bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] text-white rounded-full font-bold text-xs font-medium w-fit mx-auto sm:mx-0 hover:opacity-90 transition-opacity"
                    >
                        CREAR UNA CUENTA
                    </Button>
                    <Button
                        type="submit"
                        className="text-[#1e3a8a] text-sm font-medium hover:underline"
                        onClick={handleRecoverPassword}
                    >
                        ¿Se te olvidó tu contraseña?
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default LoginModal; 