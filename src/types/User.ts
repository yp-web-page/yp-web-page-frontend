import { UserRole } from "./UserRole";

export interface User {
    role: UserRole;
    name: string;
    phone: string;
    email: string;
    username: string;
}