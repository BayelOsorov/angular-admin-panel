import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';

@Component({
    templateUrl: './detail-partner.component.html',
    styleUrls: ['./detail-partner.component.scss'],
})
export class DetailPartnerComponent implements OnInit {
    partner;
    partnerId: number;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private partnersService: PartnersService,
        private route: ActivatedRoute
    ) {}
    getDetailPartner() {
        this.partnersService
            .getDetailPartner(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => (this.partner = data));
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.partnerId = params['id'];
        });
        this.getDetailPartner();
    }
}
