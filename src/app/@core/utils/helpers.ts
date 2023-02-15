/* eslint-disable brace-style */
const translateMaritalStatus = (str: string) => {
    switch (str) {
        case 'Married':
            return 'Женат/ Замужем';

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
const trEngToRusOwnerST = (value) => {
    switch (value) {
        case 'Other':
            return 'ЧП';
        case 'OsOO':
            return 'ОсОО';
        case 'IndividualEntrepreneur':
            return 'ИП';
        default:
            return value;
    }
};
const getProductCode = (productCode) => {
    switch (productCode) {
        case 'Charmander':
            return '0-0-3';
        case 'Pikachu':
            return 'Топливная карта';
        default:
            return productCode;
    }
};
const translateIdentificationLevels = (status) => {
    switch (status) {
        case 'Online':
            return 'Онлайн идентифицирован';
        case 'Offline':
            return 'Офлайн идентифицирован';
        case 'None':
            return 'Не идентифицирован';
        default:
            break;
    }
};
const downloadFile = (fileURL, fileName) => {
    // for non-IE
    const save = document.createElement('a');
    save.href = fileURL;
    save.target = '_blank';
    const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
    save.download = fileName || filename;
    if (
        navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
        navigator.userAgent.search('Chrome') < 0
    ) {
        document.location = save.href;
        // window event not working here
    } else {
        const evt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false,
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
};

const imageExtensions = ['png', 'jpeg', 'jpg', 'gif'];
const documentExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
const pdf = ['pdf'];
const audioExtensions = ['mp3', 'wav', 'm4a', 'ogg'];
const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
const textExtensions = ['txt', 'csv'];

const getFileType = (fileExtension) => {
    switch (true) {
        case imageExtensions.includes(fileExtension):
            return 'image';
        case documentExtensions.includes(fileExtension):
            return 'document';
        case audioExtensions.includes(fileExtension):
            return 'audio';
        case videoExtensions.includes(fileExtension):
            return 'video';
        case textExtensions.includes(fileExtension):
            return 'document'; // return 'text' ;
        case pdf.includes(fileExtension):
            return 'pdf';
        default:
            return 'unknown';
    }
};
const checkRolePermission = (roles, accessRole) => {
    const hasAccess = Array.isArray(roles)
        ? accessRole.some((i) => roles.includes(i))
        : accessRole.includes(roles);
    return hasAccess;
};

export {
    translateMaritalStatus,
    truncateText,
    accessLevel,
    truncateDecimals,
    cleanEmptyKeyInObj,
    trEngToRusOwnerST,
    downloadFile,
    translateIdentificationLevels,
    checkRolePermission,
    getFileType,
    getProductCode,
};
