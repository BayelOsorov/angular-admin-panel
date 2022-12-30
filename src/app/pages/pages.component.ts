import { Component } from '@angular/core';
import { accessLevel } from '../@core/utils/helpers';

import { MENU_ITEMS } from './pages-menu';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-one-column-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-one-column-layout>
    `,
})
export class PagesComponent {
    userData = JSON.parse(sessionStorage.getItem('0-admin_idp_client'))
        .userData;
    getRole = (roles) => {
        if (this.userData) {
            return !accessLevel(roles, this.userData.role);
        }
    };
    // menu = MENU_ITEMS;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    menu = [
        {
            title: 'Идентификация',
            icon: 'list',
            hidden: this.getRole(['admin', 'operator']),
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
            hidden: this.getRole(['admin', 'credit_specialist']),
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
            hidden: this.getRole(['admin']),
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
            hidden: this.getRole(['admin', 'manager', 'underwriter']),
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
            hidden: this.getRole(['admin', 'manager', 'underwriter']),

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
            hidden: this.getRole(['admin', 'manager', 'underwriter']),

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
}
