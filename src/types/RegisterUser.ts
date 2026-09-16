interface RegisterUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    segment: 'retail' | 'wholesale';
}

export default RegisterUser;
