/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
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
const getAlertStatus = (value) => {
    switch (value) {
        case 'Approved':
            return 'success';
        case 'Pending':
            return 'info';
        case 'Created':
            return 'info';
        case 'Declined':
            return 'danger';
        case 'NeedToEdit':
            return 'warning';
        case 'PhotosApproved':
            return 'primary';
        case 'Canceled':
            return 'control';
        case 'VideoIdentificationRequested':
            return 'primary';
        case 'InProcess':
            return 'primary';
        case 'EditRequired':
            return 'warning';
        case 'Timeout':
            return 'control';
        case 'Requested':
            return 'primary';
        case 'Online':
            return 'primary';
        case 'Offline':
            return 'success';

        case 'PhotoIdentificationRequest':
            return 'info';
        case 'PhotoIdentificationProcess':
            return 'primary';
        case 'PhotoIdentificationApprove':
            return 'success';
        case 'PhotoIdentificationEditRequired':
            return 'warning';
        case 'PhotoIdentificationDecline':
            return 'danger';
        case 'VideoIdentificationRequest':
            return 'info';
        case 'VideoIdentificationProcess':
            return 'primary';
        case 'VideoIdentificationSuspend':
            return 'control';
        case 'VideoIdentificationApprove':
            return 'success';
        case 'VideoIdentificationDecline':
            return 'danger';
        case true:
            return 'success';
        case false:
            return 'primary';
        case 'None':
            return 'control';
        default:
            return 'primary';
    }
};
const isPhone = () => {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        ) {
            check = true;
        }
    })(navigator.userAgent || navigator.vendor);
    return check;
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
    isPhone,
    getAlertStatus,
};
