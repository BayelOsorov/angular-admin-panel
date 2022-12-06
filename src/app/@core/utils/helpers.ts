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
export { translateMaritalStatus, truncateText };
