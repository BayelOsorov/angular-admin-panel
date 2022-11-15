import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';

@Component({
    selector: 'ngx-partner-branches',
    templateUrl: './branches.component.html',
    styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit, OnDestroy {
    @Input() partnerId: number;
    listBranches;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersService: PartnersService,
        private router: Router
    ) {}
    editBranch(id) {
        this.router.navigate([
            `catalog/partners/${this.partnerId}/branches/update/${id}`,
        ]);
    }
    deleteBranch(id) {}
    getBranches() {
        this.partnersService
            .getListPartnerBranches(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listBranches = data;
            });
    }
    ngOnInit(): void {
        this.getBranches();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
