interface RegisterUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    segment: 'retail' | 'wholesale';
    rut?: File | null;
}

export default RegisterUser;
