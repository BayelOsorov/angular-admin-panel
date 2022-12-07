import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    // {
    //     title: 'E-commerce',
    //     icon: 'shopping-cart-outline',
    //     link: '/pages/dashboard',
    //     home: true,
    // },
    // {
    //     title: 'IoT Dashboard',
    //     icon: 'home-outline',
    //     link: '/pages/iot-dashboard',
    // },
    // {
    //     title: 'FEATURES',
    //     group: true,
    // },
    {
        title: 'Идентификация',
        icon: 'list',
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
        children: [
            {
                title: 'Список сотрудников',
                link: '/staff',
            },
        ],
    },
    {
        title: 'Партнеры',
        icon: 'edit-2-outline',
        link: '/catalog',
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
            {
                title: 'Группы',
                link: '/catalog/groups',
            },

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
    // {
    //     title: 'UI Features',
    //     icon: 'keypad-outline',
    //     link: '/pages/ui-features',
    //     children: [
    //         {
    //             title: 'Grid',
    //             link: '/pages/ui-features/grid',
    //         },
    //         {
    //             title: 'Icons',
    //             link: '/pages/ui-features/icons',
    //         },
    //         {
    //             title: 'Typography',
    //             link: '/pages/ui-features/typography',
    //         },
    //         {
    //             title: 'Animated Searches',
    //             link: '/pages/ui-features/search-fields',
    //         },
    //     ],
    // },
    // {
    //     title: 'Modal & Overlays',
    //     icon: 'browser-outline',
    //     children: [
    //         {
    //             title: 'Dialog',
    //             link: '/pages/modal-overlays/dialog',
    //         },
    //         {
    //             title: 'Window',
    //             link: '/pages/modal-overlays/window',
    //         },
    //         {
    //             title: 'Popover',
    //             link: '/pages/modal-overlays/popover',
    //         },
    //         {
    //             title: 'Toastr',
    //             link: '/pages/modal-overlays/toastr',
    //         },
    //         {
    //             title: 'Tooltip',
    //             link: '/pages/modal-overlays/tooltip',
    //         },
    //     ],
    // },
    // {
    //     title: 'Extra Components',
    //     icon: 'message-circle-outline',
    //     children: [
    //         {
    //             title: 'Calendar',
    //             link: '/pages/extra-components/calendar',
    //         },
    //         {
    //             title: 'Progress Bar',
    //             link: '/pages/extra-components/progress-bar',
    //         },
    //         {
    //             title: 'Spinner',
    //             link: '/pages/extra-components/spinner',
    //         },
    //         {
    //             title: 'Alert',
    //             link: '/pages/extra-components/alert',
    //         },
    //         {
    //             title: 'Calendar Kit',
    //             link: '/pages/extra-components/calendar-kit',
    //         },
    //         {
    //             title: 'Chat',
    //             link: '/pages/extra-components/chat',
    //         },
    //     ],
    // },
    // {
    //     title: 'Maps',
    //     icon: 'map-outline',
    //     children: [
    //         {
    //             title: 'Google Maps',
    //             link: '/pages/maps/gmaps',
    //         },
    //         {
    //             title: 'Leaflet Maps',
    //             link: '/pages/maps/leaflet',
    //         },
    //         {
    //             title: 'Bubble Maps',
    //             link: '/pages/maps/bubble',
    //         },
    //         {
    //             title: 'Search Maps',
    //             link: '/pages/maps/searchmap',
    //         },
    //     ],
    // },
    // {
    //     title: 'Charts',
    //     icon: 'pie-chart-outline',
    //     children: [
    //         {
    //             title: 'Echarts',
    //             link: '/pages/charts/echarts',
    //         },
    //         {
    //             title: 'Charts.js',
    //             link: '/pages/charts/chartjs',
    //         },
    //         {
    //             title: 'D3',
    //             link: '/pages/charts/d3',
    //         },
    //     ],
    // },
    // {
    //     title: 'Editors',
    //     icon: 'text-outline',
    //     children: [
    //         {
    //             title: 'TinyMCE',
    //             link: '/pages/editors/tinymce',
    //         },
    //         {
    //             title: 'CKEditor',
    //             link: '/pages/editors/ckeditor',
    //         },
    //     ],
    // },
    // {
    //     title: 'Tables & Data',
    //     icon: 'grid-outline',
    //     children: [
    //         {
    //             title: 'Smart Table',
    //             link: '/pages/tables/smart-table',
    //         },
    //         {
    //             title: 'Tree Grid',
    //             link: '/pages/tables/tree-grid',
    //         },
    //     ],
    // },
    // {
    //     title: 'Miscellaneous',
    //     icon: 'shuffle-2-outline',
    //     children: [
    //         {
    //             title: '404',
    //             link: '/pages/miscellaneous/404',
    //         },
    //     ],
    // },
    // {
    //     title: 'Auth',
    //     icon: 'lock-outline',
    //     children: [
    //         {
    //             title: 'Login',
    //             link: '/auth/login',
    //         },
    //         {
    //             title: 'Register',
    //             link: '/auth/register',
    //         },
    //         {
    //             title: 'Request Password',
    //             link: '/auth/request-password',
    //         },
    //         {
    //             title: 'Reset Password',
    //             link: '/auth/reset-password',
    //         },
    //     ],
    // },
];
