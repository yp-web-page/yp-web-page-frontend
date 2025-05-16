import { UserRole } from "./UserRole";

export interface UpdateUser {
    role: UserRole;
    name: string;
    phone: string;
    email: string;
    username: string;
}