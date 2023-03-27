/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { switchMap, share, retry, takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../@core/services/credit-application/credit.service';
import { IdentificationService } from '../@core/services/identification/identification.service';
import { accessLevel } from '../@core/utils/helpers';

// import { MENU_ITEMS } from './pages-menu';
export interface IdentificationI {
    photoIdentificationRequestsCount: string;
    videoIdentificationRequestsCount: string;
}
export interface CreditAppI {
    count: string;
}
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
export class PagesComponent implements OnInit, OnDestroy {
    userData = JSON.parse(sessionStorage.getItem('0-admin_idp_client'))
        .userData;
    getRole = (roles) => {
        if (this.userData) {
            return !accessLevel(roles, this.userData.role);
        }
    };

    private identifications$: Observable<IdentificationI>;
    private ocl$: Observable<CreditAppI>;
    private ucl$: Observable<CreditAppI>;
    private fuel$: Observable<CreditAppI>;

    private stopPolling = new Subject();
    private destroy$: Subject<void> = new Subject<void>();

    menu = [
        {
            title: 'Идентификация',
            icon: 'list-outline',
            hidden: this.getRole(['admin', 'operator', 'kyc_manager']),
            children: [
                {
                    title: 'по фотографии',
                    link: '/identification/photo',
                },
                {
                    title: 'по видео',
                    link: '/identification/video',
                },
                {
                    title: 'Список',
                    link: '/identification/list',
                    hidden: this.getRole(['kyc_manager', 'admin']),
                },
            ],
        },
        {
            title: 'Отчеты',
            icon: 'file-text-outline',
            hidden: this.getRole(['admin', 'operator', 'kyc_manager']),
            children: [
                {
                    title: 'Идентификация',
                    children: [
                        {
                            title: 'Не завершившие идентификацию',
                            link: '/reports/identification/in-process',
                        },
                        {
                            title: 'Не идентифицированные',
                            link: '/reports/identification/not-identified',
                        },
                    ],
                },
                {
                    title: '0-0-3',
                    children: [
                        {
                            title: 'Не завершили заявку',
                            link: '/reports/0-0-3/in-process',
                        },
                        {
                            title: 'Не подали заявку',
                            link: '/reports/0-0-3/dont-have-ocl',
                        },
                    ],
                },
                {
                    title: 'Топливная карта',
                    children: [
                        {
                            title: 'Не завершили заявку',
                            link: '/reports/fuel-card/in-process',
                        },
                        {
                            title: 'Не подали заявку',
                            link: '/reports/fuel-card/dont-have-ocl',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Пользователи',
            icon: 'people',
            hidden: this.getRole(['admin', 'credit_specialist', 'collector']),
            children: [
                {
                    title: 'Список пользователей',
                    link: '/users/list',
                },
            ],
        },
        {
            title: 'Заявки на кредит',
            icon: 'credit-card-outline',
            link: '/credit-application',
            hidden: this.getRole([
                'admin',
                'credit_specialist',
                'credit_specialist_admin',
            ]),
            children: [
                // ! For Admins
                {
                    title: '0-0-3',
                    link: '/credit-application/0-0-3/get',

                    children: !this.getRole([
                        'admin',
                        'credit_specialist_admin',
                    ]) && [
                        {
                            title: 'Список',
                            link: '/credit-application/0-0-3/list',
                        },
                        {
                            title: 'Получение заявки',
                            link: '/credit-application/0-0-3/get',
                            hidden: this.getRole(['credit_specialist']),
                        },
                    ],
                },
                {
                    title: 'Увеличение лимита',
                    link: '/credit-application/increase-limit/get',
                    children: !this.getRole([
                        'admin',
                        'credit_specialist_admin',
                    ]) && [
                        {
                            title: 'Список',
                            link: '/credit-application/increase-limit/list',
                        },
                        {
                            title: 'Получение заявки',
                            link: '/credit-application/increase-limit/get',
                            hidden: this.getRole(['credit_specialist']),
                        },
                    ],
                },

                {
                    title: 'Топливная карта',
                    link: '/credit-application/fuel-card/get',
                    children: !this.getRole([
                        'admin',
                        'credit_specialist_admin',
                    ]) && [
                        {
                            title: 'Список',
                            link: '/credit-application/fuel-card/list',
                        },
                        {
                            title: 'Получение заявки',
                            link: '/credit-application/fuel-card/get',
                            hidden: this.getRole(['credit_specialist']),
                        },
                    ],
                },
            ],
        },
        {
            title: 'Сотрудники',
            icon: 'people-outline',
            hidden: this.getRole(['admin']),
            children: [
                {
                    title: 'Список сотрудников',
                    link: '/staff',
                },
                {
                    title: 'Продажисты',
                    link: '/salespeople',
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
                {
                    title: 'Идентификация партнеров',
                    link: '/catalog/partner-identification',
                },
            ],
        },
        {
            title: 'Новости',
            icon: 'calendar-outline',
            hidden: this.getRole(['admin', 'manager', 'underwriter']),

            children: [
                {
                    title: 'для партнера',
                    link: '/catalog/partner-news',
                },
                {
                    title: 'для клиента',
                    link: '/catalog/news',
                },
            ],
        },
        {
            title: 'Каталог партнеров',
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

                {
                    title: 'Акции и Промо',
                    link: '/catalog/partner-proms',
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
        {
            title: 'Бонусы',
            icon: 'gift',
            hidden: this.getRole(['admin', 'underwriter']),

            children: [
                {
                    title: 'Партнеры - Бонусы',
                    link: '/bonuses/partners/list',
                },
            ],
        },
    ];
    constructor(
        private identificationService: IdentificationService,
        private creditAppsService: ApplicationRequestsService,
        private cd: ChangeDetectorRef
    ) {
        this.identifications$ = timer(1, 4000).pipe(
            switchMap(() =>
                this.identificationService.getIdentificationAppCount()
            ),
            retry(5),
            share(),
            takeUntil(this.stopPolling)
        );
        this.ocl$ = timer(1, 4000).pipe(
            switchMap(() => this.creditAppsService.getCountOclApp()),
            retry(5),
            share(),
            takeUntil(this.stopPolling)
        );
        this.ucl$ = timer(1, 4000).pipe(
            switchMap(() => this.creditAppsService.getCountUclApp()),
            retry(5),
            share(),
            takeUntil(this.stopPolling)
        );
        this.fuel$ = timer(1, 4000).pipe(
            switchMap(() => this.creditAppsService.getCountFuelApp()),
            retry(5),
            share(),
            takeUntil(this.stopPolling)
        );
    }

    getCountIdentification() {
        this.identifications$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: any) => {
                this.updateBadgeValue(
                    this.menu,
                    'Идентификация',
                    'по фотографии',
                    data.photoIdentificationRequestsCount
                );
                this.updateBadgeValue(
                    this.menu,
                    'Идентификация',
                    'по видео',
                    data.videoIdentificationRequestsCount
                );
            },
        });
    }
    getCountOcl() {
        this.ocl$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: any) => {
                this.updateBadgeValue(
                    this.menu,
                    'Заявки на кредит',
                    '0-0-3',
                    data.count
                );
            },
        });
    }
    getCountUcl() {
        this.ucl$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: any) => {
                this.updateBadgeValue(
                    this.menu,
                    'Заявки на кредит',
                    'Увеличение лимита',
                    data.count
                );
            },
        });
    }
    getCountFuel() {
        this.fuel$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: any) => {
                this.updateBadgeValue(
                    this.menu,
                    'Заявки на кредит',
                    'Топливная карта',
                    data.count
                );
            },
        });
    }
    updateBadgeValue(
        arr,
        parentTitle,
        childTitle,
        newValue,
        badgeStatus = 'info'
    ) {
        arr.forEach((item) => {
            if (!item.children || item.title !== parentTitle) {
                return;
            }
            item.children.forEach((elem) => {
                if (elem.title !== childTitle) {
                    return;
                }
                // if (elem.children && elem.children.length > 0) {
                //     elem.children.forEach((child) => {
                //         if (child.title === 'Получение заявки') {
                //             Object.assign(child, {
                //                 badge: {
                //                     text: newValue,
                //                     status: badgeStatus,
                //                 },
                //             });
                //         }
                //     });
                //     return;
                // }
                Object.assign(elem, {
                    badge: {
                        text: newValue,
                        status: badgeStatus,
                    },
                });
            });
        });
    }
    ngOnInit(): void {
        if (!this.getRole(['operator'])) {
            this.getCountIdentification();
        }
        if (!this.getRole(['credit_specialist'])) {
            this.getCountOcl();
            this.getCountUcl();
            this.getCountFuel();
        }
        // this.getCountIdentification();
        // this.getCountOcl();
        // this.getCountUcl();
        // this.getCountFuel();
    }
    ngOnDestroy() {
        this.stopPolling.next();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
