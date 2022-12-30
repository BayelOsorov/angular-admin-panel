import { NbMenuItem } from '@nebular/theme';
import { accessLevel } from '../@core/utils/helpers';

const getRole = (roles) => {
    const { userData } = JSON.parse(
        sessionStorage.getItem('0-admin_idp_client')
    );
    if (userData) {
        return !accessLevel(roles, userData.role);
    }
};
export class PagesMenu {}
export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Идентификация',
        icon: 'list',
        hidden: getRole(['admin', 'operator']),
        children: [
            {
                title: 'Идентификация по фотографии',
                link: '/identification/photo',
            },
            {
                title: 'Идентификация по видео',
                link: '/identification/video',
            },
        ],
    },
    {
        title: 'Заявки на кредит',
        icon: 'credit-card-outline',
        link: '/credit-application',
        hidden: getRole(['admin', 'credit_specialist']),
        children: [
            {
                title: '0-0-3',
                link: '/credit-application/0-0-3',
            },
            // {
            //     title: '0-0-6',
            //     link: '/credit-application/0-0-6',
            // },
            // {
            //     title: '0-0-6',
            //     link: '/credit-application/0-0-6',
            // },
            // {
            //     title: '0-0-12',
            //     link: '/credit-application/0-0-12',
            // },
            {
                title: 'Топливная карта',
                link: '/credit-application/fuel',
            },
        ],
    },
    {
        title: 'Сотрудники',
        icon: 'people',
        hidden: getRole(['admin']),
        children: [
            {
                title: 'Список сотрудников',
                link: '/staff',
            },
        ],
    },
    {
        title: 'Партнеры',
        icon: 'keypad',
        hidden: getRole(['admin', 'manager', 'underwriter']),
        children: [
            {
                title: 'Партнеры',
                link: '/contragents/list',
            },
        ],
    },
    {
        title: 'Каталог партнера',
        icon: 'edit-2-outline',
        link: '/catalog',
        hidden: getRole(['admin', 'manager', 'underwriter']),

        children: [
            {
                title: 'Населенные пункты',
                link: '/catalog/localities',
            },
            {
                title: 'Места',
                link: '/catalog/malls',
            },
            {
                title: 'Продукты',
                link: '/catalog/products',
            },
            {
                title: 'Категории',
                link: '/catalog/categories',
            },
            {
                title: 'Бренды',
                link: '/catalog/brands',
            },

            {
                title: 'Тэги',
                link: '/catalog/tags',
            },
            {
                title: 'Партнеры',
                link: '/catalog/partners',
            },
            // {
            //     title: 'Группы',
            //     link: '/catalog/groups',
            // },

            {
                title: 'Акции и Промо',
                link: '/catalog/partner-proms',
            },
            {
                title: 'Новости',
                link: '/catalog/news',
            },
            {
                title: 'Отзывы',
                link: '/catalog/partner-feedbacks',
            },
        ],
    },
    {
        title: 'Центр поддержки',
        icon: 'phone',
        hidden: getRole(['admin', 'manager', 'underwriter']),

        children: [
            {
                title: 'Категории',
                link: '/support-center/categories/list',
            },
            {
                title: 'Продукты',
                link: '/support-center/products/list',
            },
        ],
    },
];
