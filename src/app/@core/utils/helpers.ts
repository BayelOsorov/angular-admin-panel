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
const truncateDecimals = (number, digits = 2) => {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = number * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};
const cleanEmptyKeyInObj = (obj) => {
    // eslint-disable-next-line guard-for-in
    for (const propName in obj) {
        if (
            obj[propName] === null ||
            obj[propName] === undefined ||
            (Array.isArray(obj[propName]) &&
                (obj[propName].includes('') || obj[propName].length === 0))
        ) {
            delete obj[propName];
        }
    }
    return obj;
};
export {
    translateMaritalStatus,
    truncateText,
    accessLevel,
    truncateDecimals,
    cleanEmptyKeyInObj,
};
