import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'ngx-beneficiares',
    templateUrl: './beneficiares.component.html',
    styleUrls: ['./beneficiares.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiaresComponent implements OnInit {
    @Output() deleteEvent = new EventEmitter();
    @Output() createEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Output() getData = new EventEmitter();

    @Input() data;
    tableColumns = {
        name: {
            title: 'ФИО',
            type: 'text',
            valuePrepareFunction: (cell, item) =>
                item.surname + ' ' + item.name + ' ' + item.fatherName,
        },

        position: {
            title: 'Должность',
            type: 'text',
        },
    };
    constructor() {}
    ngOnInit(): void {}
}
