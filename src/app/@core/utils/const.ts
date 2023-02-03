export const HttpOptions: object = {
    responseType: 'blob',
};
export const IdentificationAnswers = {
    pin: [
        {
            label: 'пожалуйста, введите правильный пин',
            value: 'пожалуйста, введите правильный пин - pin',
        },
    ],
    passportFrontSideImage: [
        {
            label: 'пожалуйста, проверьте правильность набора AN',
            value: 'пожалуйста, проверьте правильность набора AN - passportFrontSideImage',
        },
        {
            label: 'пожалуйста, проверьте правильность набора ID',
            value: 'пожалуйста, проверьте правильность набора ID - passportFrontSideImage',
        },
        {
            label: 'пожалуйста, не закрывайте данные паспорта.',
            value: 'пожалуйста, не закрывайте данные паспорта. - passportFrontSideImage',
        },
    ],
    passportBackSideImage: [
        {
            label: 'пожалуйста, сфотографируйтесь с оригиналом паспорта.',
            value: 'пожалуйста, сфотографируйтесь с оригиналом паспорта. - passportBackSideImage',
        },
        {
            label: 'пожалуйста, сфотографируйтесь с действующим паспортом.',
            value: 'пожалуйста, сфотографируйтесь с действующим паспортом. - passportBackSideImage',
        },
    ],
    selfieWithPassportImage: [
        {
            label: 'пожалуйста, сфотографируйтесь с паспортом у лица без головного убора.',
            value: 'пожалуйста, сфотографируйтесь с паспортом у лица без головного убора. - selfieWithPassportImage',
        },
        {
            label: 'пожалуйста, сфотографируйтесь без очков.',
            value: 'пожалуйста, сфотографируйтесь без очков. - selfieWithPassportImage',
        },
        {
            label: 'пожалуйста, сфотографируйтесь без платка.',
            value: 'пожалуйста, сфотографируйтесь без платка. - selfieWithPassportImage',
        },
        {
            label: 'пожалуйста, сфотографируйтесь с паспортом, чтобы данные паспорта можно было прочитать.',
            value: 'пожалуйста, сфотографируйтесь с паспортом, чтобы данные паспорта можно было прочитать. - selfieWithPassportImage',
        },
    ],
    documentNumber: [
        {
            label: 'пожалуйста, проверьте правильность набора AN',
            value: 'пожалуйста, проверьте правильность набора AN - documentNumber',
        },
        {
            label: 'пожалуйста, проверьте правильность набора ID',
            value: 'пожалуйста, проверьте правильность набора ID - documentNumber',
        },
    ],
    address: [
        {
            label: 'пожалуйста, введите правильный адрес',
            value: 'пожалуйста, введите правильный адрес - address',
        },
    ],
};
export const statusIdentificate = [
    { id: 'Pending', text: 'Ожидание' },
    { id: 'Created', text: 'Ожидание' },
    { id: 'Approved', text: 'Одобренный' },
    { id: 'Declined', text: 'Отклоненный' },
    { id: 'NeedToEdit', text: 'Нужно отредактировать' },
    { id: 'PhotosApproved', text: 'Подтверждение фото' },
    { id: 'Canceled', text: 'Отменено' },
    { id: 'VideoIdentificationRequested', text: 'Готов к видео' },
    { id: 'Requested', text: 'Ожидание' },
    { id: 'InProcess', text: 'В процессе' },
    { id: 'EditRequired', text: 'Нужно отредактировать' },
    { id: 'Timeout', text: 'Время и стекло' },
    { id: 'Online', text: 'Онлайн' },
    { id: 'Offline', text: 'Оффлайн' },
    { id: 'None', text: 'Не идентифицирован' },
];
