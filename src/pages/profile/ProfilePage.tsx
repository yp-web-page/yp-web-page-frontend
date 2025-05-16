import { useForm } from 'react-hook-form';
import SplitScreen from '../../components/SplitScreen';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import FormatInput from '../../components/FormatInput';
import { useEffect } from 'react';
import Button from '../../components/Button';
import { useGetUser } from '../../hooks/useGetUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { UserRole } from '../../types/UserRole';
import Skeleton from '../../components/ui/Skeleton';

interface ProfileFormInputs {
    role: string;
    name: string;
    phone: string;
    email: string;
    username: string;
}

const MAX_NAME_LENGTH = 50;
const MAX_PHONE_LENGTH = 10;
const MAX_EMAIL_LENGTH = 50;

const ProfilePage: React.FC = () => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    const navigate = useNavigate();

    const { data: user, isLoading } = useGetUser();
    const { mutate, isPending } = useUpdateUser();

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch,
        reset,
    } = useForm<ProfileFormInputs>({
        defaultValues: {
            role: '',
            name: '',
            phone: '',
            email: '',
            username: '',
        }
    });

    const nameLength = (watch('name') || '').length;
    const phoneLength = (watch('phone') || '').length;
    const emailLength = (watch('email') || '').length;

    useEffect(() => {
        if (!isAuthenticated && !isAuthLoading) {
          navigate('/');
        }
    }, [isAuthenticated, isAuthLoading, navigate]);

    useEffect(() => {
        if (user) {
            reset(user);
        }            
    }, [user, reset]);

    const resetForm = () => {
        reset({}, {
            keepErrors: false,
            keepDirty: false,
            keepTouched: false,
        });
    };

    const onSubmit = (data: ProfileFormInputs) => {
        if (isLoading) return;

        if (!user || JSON.stringify(data) === JSON.stringify(user)) return;

        if (data) {
            mutate({
                role: data.role as UserRole,
                name: data.name,
                phone: data.phone,
                email: data.email,
                username: data.username,
            });
        }
    };

    const handleExit = () => {
        resetForm();
        navigate('/');
    }

    const currentValuesFormFields = watch();
    const isUpdateDisabled = 
        isLoading || isPending || JSON.stringify(currentValuesFormFields) === JSON.stringify(user)

    const rightContent = (): React.ReactElement => {
        if (isLoading) return <Skeleton />; // TODO: Add an standard sekeleton component for Loading.

        return(
        <>
            <img src="/logo_favicon.png " alt="Logo" className="h-16 mb-6" />
            <h2 className="text-2xl font-semibold mb-6 text-gray-500">Perfil Usuario</h2>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-[320px] mx-auto space-y-1 sm:space-y-2 text-xs sm:text-base"
            >
                <FormatInput<ProfileFormInputs>
                    name="role"
                    label="Tipo de usuario"
                    type="text"
                    isRequired={false}
                    disabled={true}
                    register={register}
                    className="w-full py-1 px-3 rounded-md bg-gray-500 text-gray-900 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FormatInput<ProfileFormInputs>
                    name="username"
                    label="Nombre de Usuario"
                    type="text"
                    isRequired={false}
                    disabled={true}
                    register={register}
                    className="w-full py-1 px-3 rounded-md bg-gray-500 text-gray-900 text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <FormatInput<ProfileFormInputs>
                    name="name"
                    label="Nombre / Nombre de la Empresa"
                    type="text"
                    isRequired={true}
                    register={(name) => register(name, {
                      required: "Este campo es requerido",
                      maxLength: {
                        value: MAX_NAME_LENGTH,
                        message: `El valor máximo de caracteres es ${MAX_NAME_LENGTH}`
                      },
                      validate: (value) => value.trim() !== '' || "No puede estar vacío o solo contener espacios"
                    })}
                    error={errors.name}
                    maxLength={MAX_NAME_LENGTH}
                    length={nameLength}
                    placeholder="Ingrese su nombre"
                />
                <FormatInput<ProfileFormInputs>
                    name="phone"
                    label="Celular"
                    type="tel"
                    isRequired={true}
                    register={(name) => register(name, { 
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Solo se permiten números"
                      }
                    })}
                    error={errors.phone}
                    maxLength={MAX_PHONE_LENGTH}
                    length={phoneLength}
                    placeholder="Ingrese su numero de celular"
                />
                <FormatInput<ProfileFormInputs>
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    isRequired={true}
                    register={(name) => register(name, {
                      required: "Este campo es requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico inválido"
                      }
                    })}
                    error={errors.email}
                    maxLength={MAX_EMAIL_LENGTH}
                    length={emailLength}
                    placeholder="Ingrese su correo electronico"
                />
                <div className="flex flex-row max-[400px]:flex-col gap-2 mb-2">
                    <Button
                        type="submit"
                        className={isUpdateDisabled ?
                            "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-3 sm:mt-4 bg-gray-500 text-white" :  
                            "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-3 sm:mt-4 blue-deep-gradient"
                        }
                        disabled={isLoading || isPending}
                    >
                        Actualizar
                    </Button>
                    <Button
                        type="button"
                        className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-3 sm:mt-4 bg-gradient-to-b from-[#ff6b6b] to-[#c0392b] text-white hover:opacity-90"
                        onClick={handleExit}
                    >
                        Salir
                    </Button>
                </div>
            </form>
        </>
    )};

    return (
        <SplitScreen 
            leftImage="/change_password_icon.jpg"
            leftImageAlt="Profile Image"
            rightContent={rightContent()}
        />
    );
};

export default ProfilePage; 