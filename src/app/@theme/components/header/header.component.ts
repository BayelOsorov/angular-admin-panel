import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../@core/services/auth/auth.service';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    userPictureOnly = false;
    user;

    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme = 'default';

    userMenu = [{ title: 'Выйти' }];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;
        this.user = this.authService.getUserData();

        const { xl } = this.breakpointService.getBreakpointsMap();
        this.themeService
            .onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
            );

        this.themeService
            .onThemeChange()
            .pipe(
                map(({ name }) => name),
                takeUntil(this.destroy$)
            )
            .subscribe((themeName) => (this.currentTheme = themeName));
        this.menuService
            .onItemClick()
            .pipe(
                filter(({ tag }) => tag === 'my-context-menu'),
                map(({ item: { title } }) => title)
            )
            .subscribe(() => this.authService.logout());
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
    shortName(fullName: string) {
        const surname = fullName.split(' ')[0];
        const name = fullName.split(' ')[1].slice(0, 1);
        const patronymic = fullName.split(' ')[2].slice(0, 1);
        return surname + ' ' + name + '. ' + patronymic + '.';
    }
}
