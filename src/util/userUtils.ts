
const getUsernameFromLocalStorage = ():string | null => {
    return localStorage.getItem('user');
}

export const UserUtils = {
    getUsernameFromLocalStorage,
}