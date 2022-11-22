import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../../@core/components/avatar-img/avatar-img.component';
import { IListNews } from '../../../../@core/models/catalog/catalog';
import { NewsService } from '../../../../@core/services/catalog/news/news.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-news.component.html',
    styleUrls: ['./list-news.component.scss'],
})
export class ListNewsComponent implements OnInit, OnDestroy {
    listNews: IListNews;
    src;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listNews.page, cell.row.index),
        },
        cover: {
            title: 'Обложка',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        title: {
            title: 'Заголовок на RU',
            type: 'string',
            valuePrepareFunction: (item) => item.ru,
        },

        shortText: {
            title: 'Короткий текст на RU',
            type: 'string',
            valuePrepareFunction: (item) => item.ru,
        },
        isActive: {
            title: 'Активен',
            type: 'string',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private newsService: NewsService,
        private toaster: ToastrService,
        private router: Router
    ) {}

    getNews(page = 1) {
        this.newsService
            .getListNews(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listNews = res));
    }
    onSearch(event) {}
    updateNews(data) {
        this.router.navigate([`catalog/news/update/${data.id}`]);
    }
    userRowSelect(id) {
        // this.router.navigate([`catalog/news/detail/${id}`]);
    }
    deleteNews(id) {
        this.newsService
            .deleteNews(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getNews();
            });
    }

    ngOnInit(): void {
        this.getNews();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
