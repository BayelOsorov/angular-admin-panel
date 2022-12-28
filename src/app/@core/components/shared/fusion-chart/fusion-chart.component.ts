import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-fusion-chart',
    templateUrl: './fusion-chart.component.html',
    styleUrls: ['./fusion-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FusionChartComponent implements OnInit {
    @Input() score;
    dataSource;

    constructor() {}

    ngOnInit(): void {
        this.dataSource = {
            chart: {
                lowerLimit: '0',
                upperLimit: '600',
                showValue: '1',
                theme: 'fusion',
                showToolTip: '0',
                // bgColor: '#222b45',
            },

            colorRange: {
                color: [
                    {
                        minValue: '0',
                        maxValue: '200',
                        code: '#F2726F',
                    },
                    {
                        minValue: '200',
                        maxValue: '400',
                        code: '#FFC533',
                    },
                    {
                        minValue: '400',
                        maxValue: '600',
                        code: '#62B58F',
                    },
                ],
            },
            dials: {
                dial: [
                    {
                        value: this.score,
                    },
                ],
            },
        };
    }
}
