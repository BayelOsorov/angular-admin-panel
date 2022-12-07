const translateMaritalStatus = (str: string) => {
    switch (str) {
        case 'Married':
            return 'Женат';

        default:
            return 'Неизвестно';
    }
};

const truncateText = (text: string, size: number = 40) =>
    text.length > size ? text.slice(0, size - 1) + '...' : text;

const accessLevel = (arg1, arg2) => {
    let result = 0;
    if (Array.isArray(arg2)) {
        arg2.forEach((role) => {
            if (arg1.includes(role)) {
                result++;
            }
        });
    } else {
        if (arg1.includes(arg2)) {
            result++;
        }
    }
    return !!result;
};
export { translateMaritalStatus, truncateText, accessLevel };
