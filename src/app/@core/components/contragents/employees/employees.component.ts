import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
    @Output() deleteEvent = new EventEmitter();
    @Output() createEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Output() getData = new EventEmitter();

    @Input() data;
    tableColumns = {
        name: {
            title: 'ФИО',
            type: 'text',
        },

        position: {
            title: 'Должность',
            type: 'text',
        },
    };
    constructor() {}

    ngOnInit(): void {
        console.log(this.data);
    }
}
