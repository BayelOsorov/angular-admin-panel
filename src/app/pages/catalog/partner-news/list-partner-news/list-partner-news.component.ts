import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerNewsService } from '../../../../@core/services/catalog/partner-news/partner-news.service';
import { tableNumbering, truncateText } from '../../../../@core/utils';
@Component({
    templateUrl: './list-partner-news.component.html',
    styleUrls: ['./list-partner-news.component.scss'],
})
export class ListPartnerNewsComponent implements OnInit, OnDestroy {
    listPartnerNews;
    src;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartnerNews.pageNumber, cell.row.index),
        },

        title: {
            title: 'Заголовок',
            type: 'text',
        },
        shortContent: {
            title: 'Короткий текст',
            type: 'text',
            valuePrepareFunction: (item) => truncateText(item),
        },

        createdAt: {
            title: 'Дата окончания',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerNewsService: PartnerNewsService,
        private datePipe: DatePipe,
        private toaster: ToastrService,
        private router: Router
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy');
    }
    getPartnerNews(page = 1, name = '') {
        this.partnerNewsService
            .getListPartnerNews(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPartnerNews = res));
    }
    onSearch(event) {
        this.getPartnerNews(1, event);
    }
    updatePartnerNews(data) {
        this.router.navigate([`catalog/partner-news/update/${data.id}`]);
    }

    deletePartnerNews(id) {
        this.partnerNewsService
            .deletePartnerNews(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getPartnerNews();
            });
    }

    ngOnInit(): void {
        this.getPartnerNews();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
