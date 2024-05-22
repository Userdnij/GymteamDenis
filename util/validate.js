export const isPasswordInvalid = (password) => {
    if (!password) {
        return 'Parole ir obligāts';
    }

    const passwordLength = password.length;
    if (passwordLength < 3) {
        return 'Parole ir jābūt vismaz 3 simbolus garai';
    }

    return false;
}

export const isEmailInvalid = (email) => {
    if (!email) {
        return 'Epasts ir obligāts';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return 'Epasta formats ir nepareizs';
    }

    return false;
}