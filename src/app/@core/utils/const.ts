export const HttpOptions: object = {
    responseType: 'blob',
};
export const IdentificationAnswers = {
    pin: [
        {
            label: 'пожалуйста, введите правильный пин',
            value: 'пожалуйста, введите правильный пин',
        },
    ],
    passportFrontSideImage: [
        {
            label: 'пожалуйста, проверьте правильность набора AN',
            value: 'пожалуйста, проверьте правильность набора AN',
        },
        {
            label: 'пожалуйста, проверьте правильность набора ID',
            value: 'пожалуйста, проверьте правильность набора ID',
        },
        {
            label: 'пожалуйста, не закрывайте данные паспорта.',
            value: 'пожалуйста, не закрывайте данные паспорта.',
        },
    ],
    passportBackSideImage: [
        {
            label: 'пожалуйста, сфотографируйтесь с оригиналом паспорта.',
            value: 'пожалуйста, сфотографируйтесь с оригиналом паспорта.',
        },
    ],
    selfieWithPassportImage: [
        {
            label: 'пожалуйста, сфотографируйтесь с паспортом у лица без головного убора.',
            value: 'пожалуйста, сфотографируйтесь с паспортом у лица без головного убора.',
        },
        {
            label: 'пожалуйста, сфотографируйтесь без очков.',
            value: 'пожалуйста, сфотографируйтесь без очков.',
        },
        {
            label: 'пожалуйста, сфотографируйтесь без платка.',
            value: 'пожалуйста, сфотографируйтесь без платка.',
        },
        {
            label: 'пожалуйста, сфотографируйтесь с паспортом, чтобы данные паспорта можно было прочитать.',
            value: 'пожалуйста, сфотографируйтесь с паспортом, чтобы данные паспорта можно было прочитать.',
        },
    ],
    documentNumber: [],
    address: [
        {
            label: 'пожалуйста, введите правильный адрес',
            value: 'пожалуйста, введите правильный адрес',
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
    { id: 'Offline', text: 'Офлайн' },
    { id: 'None', text: 'Не идентифицирован' },

    { id: 'PhotoIdentificationRequest', text: 'Запрошена фотоидентификация' },
    { id: 'PhotoIdentificationProcess', text: 'В процессе фотоидентификации' },
    { id: 'PhotoIdentificationApprove', text: 'Одобрена фотоидентификация' },
    {
        id: 'PhotoIdentificationEditRequired',
        text: 'Нужно отредактировать фотоидентификацию',
    },
    { id: 'PhotoIdentificationDecline', text: 'Отклонена видеоидентификация' },
    { id: 'VideoIdentificationRequest', text: 'Запрошена видеоидентификация' },
    { id: 'VideoIdentificationProcess', text: 'В процессе видеоидентификации' },
    {
        id: 'VideoIdentificationSuspend',
        text: 'Приостановлена видеоидентификации',
    },
    { id: 'VideoIdentificationApprove', text: 'Одобрена видеоидентификация' },
    {
        id: 'VideoIdentificationDecline',
        text: 'Нужно отредактировать видеоидентификацию',
    },

    { id: true, text: 'Одобренный' },
    { id: false, text: 'Ожидание' },
];
