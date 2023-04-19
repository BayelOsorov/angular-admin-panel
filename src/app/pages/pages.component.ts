/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { switchMap, share, retry, takeUntil } from 'rxjs/operators';
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

    private stopPolling = new Subject();
    private destroy$: Subject<void> = new Subject<void>();

    menu = [
        {
            title: 'test',
            icon: 'list-outline',
            hidden: this.getRole(['admin', 'operator', 'kyc_manager']),
            children: [],
        },
    ];
    constructor(private cd: ChangeDetectorRef) {}

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
    ngOnInit(): void {}
    ngOnDestroy() {
        this.stopPolling.next();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
