import { Pipe, PipeTransform } from '@angular/core';
import { FormatDate } from '../../../utils';

@Pipe({
    name: 'datePipe',
})
export class CustomDatePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return FormatDate(value);
    }
}
