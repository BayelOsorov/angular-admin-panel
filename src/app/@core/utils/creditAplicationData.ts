const Position = [
    { value: 'Specialist', text: 'Специалист' },
    { value: 'Driver', text: 'Водитель' },
    { value: 'LeadingSpecialist', text: 'Ведущий специалист' },
    { value: 'Manager0', text: 'Заведующий' },
    { value: 'ChiefSpecialist', text: 'Главный специалист' },
    { value: 'Manager1', text: 'Менеджер' },
    { value: 'DepartmentHead', text: 'Начальник отдела' },
    { value: 'Accountant0', text: 'Главный бухгалтер' },
    { value: 'Accountant1', text: 'Зам бухгалтер' },
    { value: 'Director0', text: 'Директор' },
    { value: 'Director1', text: 'Зам директор' },
    { value: 'Other', text: 'Другое' },
];
const placeOfWorkType = [
    { value: 'employment', text: 'Работа по найму' },
    { value: 'entrepreneurship', text: 'Предпринимательство' },
];
const entrepreneurTypeEnum = [
    { value: 'Trade', text: 'Торговля' },
    { value: 'Education', text: 'Образование' },
    { value: 'Transport', text: 'Транспорт' },
    { value: 'Medicine', text: 'Медицина' },
    { value: 'Manufacturing', text: 'Производство' },
    { value: 'Catering', text: 'Кейтеринг' },
    { value: 'Services', text: 'Услуги' },
    { value: 'Agriculture', text: 'Сельское хозяйство' },
    { value: 'Finance', text: 'Финансы' },
    { value: 'Construction', text: 'Строительство' },
    { value: 'Other', text: 'Другое' },
];

const residenceLocationEnum = [
    { value: 'Bishkek', text: 'Бишкек' },
    { value: 'Osh', text: 'Ош' },
    { value: 'Batken', text: 'Баткенская обл.' },
    { value: 'JalalAbad', text: 'Джалал-Абадская обл.' },
    { value: 'Naryn', text: 'Нарынская обл.' },
    { value: 'Osh', text: 'Ошская обл.' },
    { value: 'Talas', text: 'Таласская обл.' },
    { value: 'Chuy', text: 'Чуйская обл.' },
    { value: 'IssykKyl', text: 'Иссык-Кульская обл.' },
];

const genderEnum = [
    { value: 'Male', text: 'Мужчина' },
    { value: 'Female', text: 'Женщина' },
];

const workExperience = [
    { value: 'OneOrLess', text: 'Один или менее' },
    { value: 'TwoOrThree', text: 'Два или три' },
    { value: 'FourOrFive', text: 'Четыре или пять' },
    { value: 'SixOrEight', text: 'Шесть или восемь' },
    { value: 'NinOrTen', text: 'Девять или десять' },
    { value: 'ElevenAndMore', text: 'Одиннацать и более' },
];

const clientHistoryTypeValue = [
    { value: 'New', text: 'Новый' },
    { value: 'Repeat', text: 'Повторный' },
    { value: 'Rejected', text: 'Отклоненный' },
    { value: 'AnotherBankClient', text: 'Другой клиент банка' },
];

const locationMonth = [
    { value: '_0and2Months', text: '0 до 2 месяцев' },
    { value: '_3and5Months', text: 'от 3 до 5 месяцев' },
    { value: '_6and11Months', text: 'от 6 до 11 месяцев' },
    { value: '_12and35Months', text: 'от 12 до 35 месяцев' },
    { value: '_36andMoreMonths', text: 'от 36 и более' },
];

const dependentsCount = [
    { value: 'Nil', text: '0' },
    { value: 'One', text: '1' },
    { value: 'Two', text: '2' },
    { value: 'Three', text: '3' },
    { value: 'Four', text: '4' },
    { value: 'MoreThanFive', text: 'Более пяти' },
];

const maritalStatus = [
    { value: 'Single', text: 'Не замужем/ не женат' },
    { value: 'Married', text: 'Женатый' },
    { value: 'CivilMarriage', text: 'Гражданский брак' },
    { value: 'Widow', text: 'Вдова' },
    { value: 'Divorced ', text: 'В разводе' },
];
const realEstateItemsEnum = [
    { value: 'Apartment', text: 'Квартира' },
    { value: 'House', text: 'Дом' },
    { value: 'LandPlot', text: 'Земельный участок' },
    { value: 'Other', text: 'Другое' },
];
const personalEstateItemsEnum = [
    { value: 'Car', text: 'Автомобиль' },
    { value: 'Motorcycle', text: 'Мотоцикл' },
    { value: 'Other', text: 'Другое' },
];

export {
    Position,
    entrepreneurTypeEnum,
    residenceLocationEnum,
    genderEnum,
    workExperience,
    clientHistoryTypeValue,
    locationMonth,
    dependentsCount,
    placeOfWorkType,
    maritalStatus,
    realEstateItemsEnum,
    personalEstateItemsEnum,
};
