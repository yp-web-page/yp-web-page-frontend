import React, { useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import ModalWrapper from './ModalWrapper';
import Button from '../Button';
import RegisterUser from '../../types/RegisterUser';
import useRegisterUser from '../../hooks/useRegisterUser';
import { UserRole } from '../../types/UserRole';
import FormatInput from '../FormatInput';
import IconWithBadge from '../icon/IconWithBadge';
import { Link } from 'react-router';
import ToolTip from '../ToolTip';
import { useModal } from '../../context/ModalContext';
import { MESSAGE } from '../../constants/message';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserType = 'REGULAR' | 'WHOLESALER';

interface RegisterFormInputs {
  name: string;
  phone: string;
  email: string;
  rut: File;
  username: string;
  password: string;
}

const MAX_NAME_LENGTH = 50;
const MAX_PHONE_LENGTH = 10;
const MAX_EMAIL_LENGTH = 50;
const MAX_USERNAME_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset,
    control
  } = useForm<RegisterFormInputs>();
  const { mutate, isPending } = useRegisterUser();
  const [ userType, setUserType ] = useState<UserType>('REGULAR');
  const [ approvedPrivacyPolicy, setApprovedPrivacyPolicy ] = useState(false);
  const [ acceptTermAndConditions, setAcceptTermAndConditions ] = useState(false);
  const { openModal } = useModal();

  const resetForm = () => {
    reset({}, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    });
    setUserType(UserRole.REGULAR);
  };

  const createWholesalerUser = (data: RegisterFormInputs, newUser: RegisterUser): void => {
    const file: File = data.rut;
      mutate({
        user: newUser,
        file: file
      });
      resetForm();
  };

  const createRegularUser = (newUser: RegisterUser): void => {
    mutate({
      user: newUser,
    });
    resetForm();
  };

  const onSubmit = (data: RegisterFormInputs): void => {
    if (!approvedPrivacyPolicy || !acceptTermAndConditions || isPending) return;

    if (userType === "WHOLESALER" && !data?.rut) {
        openModal("notification", MESSAGE.MISSING_RUT_FILE, "info");
        return;
    }

    const newUser: RegisterUser = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: data.password, 
      role: userType,
    };

    if (userType === "WHOLESALER"  && data?.rut) {
      createWholesalerUser(data, newUser);
      return;
    } 

    createRegularUser(newUser);
    return;
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const nameLength = useMemo(() => (watch('name') || '').length, [watch('name')]);
  const phoneLength = useMemo(() => (watch('phone') || '').length, [watch('phone')]);
  const emailLength = useMemo(() => (watch('email') || '').length, [watch('email')]);
  const usernameLength = useMemo(() => (watch('username') || '').length, [watch('username')]);
  const passwordLength = useMemo(() => (watch('password') || '').length, [watch('password')]);

  const isRegisteredButtonDisabled = useMemo(() => {
    return !approvedPrivacyPolicy || !acceptTermAndConditions || isPending  || Object.keys(errors).length > 0;
  }, [approvedPrivacyPolicy, acceptTermAndConditions, errors]);
  
  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={handleClose}
      showIcon={true}
      iconContent={
        <IconWithBadge 
          icon="user"
          badgeIcon="plus"
          badgeFill="white"
          containerClassName="relative flex items-center justify-center"
          iconClassName="text-white w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]"
          badgeWrapperClassName="absolute -left-1 -bottom-1"
          badgeContainerClassName="bg-[#4263EB] rounded-full p-1.5 shadow-lg w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex items-center justify-center"
          badgeIconClassName="text-white w-5 h-5 sm:w-6 sm:h-6"
        />
      }
    >
      <div className="px-3">
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-blue-600">REGISTRATE</h2>
        <p className="text-center text-gray-600 text-xs mb-1.5 sm:mb-2">
          ¡Haz un unico registro y tendras acceso a toda nuestra lista de precios!
        </p>

        {/* User type selector */}
        <div className="flex flex-row max-[400px]:flex-col gap-2 mb-2">
          <Button
            type='button'
            className={`w-full py-1.5 px-3 rounded-full text-sm font-bold transition-colors ${
              userType === 'REGULAR'
                ? 'blue-deep-gradient'
                : 'bg-gray-300 text-white'
            }`}
            onClick={() => setUserType('REGULAR')}
          > 
            REGULAR 
          </Button>

          <Button 
            type='button'
            className={`w-full py-1.5 px-3 rounded-full text-sm font-bold transition-colors ${
              userType === 'WHOLESALER'
                ? 'blue-deep-gradient'
                : 'bg-gray-300 text-white'
            }`}
            onClick={() => setUserType('WHOLESALER')}
          >
            PUBLICISTA
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[320px] mx-auto space-y-1 sm:space-y-2 text-xs sm:text-base">
          <FormatInput<RegisterFormInputs>
            name="name"
            label="Nombre / Nombre de la Empresa"
            type="text"
            isRequired={true}
            register={(name) => register(name, {
              required: "Este campo es requerido",
              maxLength: {
                value: MAX_NAME_LENGTH,
                message: `El valor máximo de caracteres es ${MAX_NAME_LENGTH}`
              }
            })}
            error={errors.name}
            maxLength={MAX_NAME_LENGTH}
            length={nameLength}
            placeholder="Ingrese su nombre"
          />

          <FormatInput<RegisterFormInputs>
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

          <FormatInput<RegisterFormInputs>
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

          {userType === 'WHOLESALER' && (
            <FormatInput<RegisterFormInputs>
              name="rut"
              label="Adjuntar RUT"
              type="file"
              isRequired={true}
              register={(name) => register(name)}
              error={errors.rut}
              accept=".pdf"
              customButton={true}
              control={control}
            />
          )}

          <FormatInput<RegisterFormInputs>
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

          <FormatInput<RegisterFormInputs>
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
            length={passwordLength}
            placeholder="Ingrese su contraseña"
            helperText={`La contraseña debe tener entre ${MIN_PASSWORD_LENGTH} y ${MAX_PASSWORD_LENGTH} caracteres, incluir mayúsculas, minúsculas y números`}
            customButton={true}
          />

          <div className="mx-auto h-0.5 bg-gray-200 mt-2" />
          <div className="text-sm text-gray-700">
            <label htmlFor="privacy-policy" className="flex items-start gap-2">
              <input
                type="checkbox"
                id="privacy-policy"
                name="privacy-policy"
                checked={approvedPrivacyPolicy}
                onChange={(e) => setApprovedPrivacyPolicy(e.target.checked)}
                className="mt-1 h-4 w-4 text-[#4263EB] border-gray-300 rounded shrink-0"
              />
              <div className="flex-1">
                He leído y acepto la{" "}
                <Link
                  to="politicas-privacidad"
                  className="text-[#4263EB] font-semibold hover:underline"
                  onClick={onClose}
                >
                  Política de Privacidad
                </Link>
              </div>
              <ToolTip 
               text="Es obligatorio aceptar la política de privacidad para registrarse como usuario."
              />
            </label>
          </div>
          <div className="text-sm text-gray-700">
            <label htmlFor="term-and-conditions" className="flex items-start gap-2">
              <input
                type="checkbox"
                id="term-and-conditions"
                name="term-and-conditions"
                checked={acceptTermAndConditions}
                onChange={(e) => setAcceptTermAndConditions(e.target.checked)}
                className="mt-1 h-4 w-4 text-[#4263EB] border-gray-300 rounded shrink-0"
              />
              <div className="flex-1">
                Al registrase aceptas nuestros{" "}
                <Link
                  to="aviso-legal"
                  className="text-[#4263EB] font-semibold hover:underline"
                  onClick={onClose}
                >
                  Terminos y Condiciones
                </Link>
              </div>
              <ToolTip 
               text="Es obligatorio aceptar los terminos y condiciones para registrarse como usuario."
              />
            </label>
          </div>

          <Button
            type="submit"
            className={isRegisteredButtonDisabled ? 
              "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-3 sm:mt-4 bg-gray-300 text-white" :
              "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-3 sm:mt-4 blue-deep-gradient" }
            disabled={isRegisteredButtonDisabled}
          >
            Registrarse
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
}

export default RegisterModal;