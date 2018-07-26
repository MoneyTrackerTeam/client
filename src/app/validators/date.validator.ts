import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbDateStruct } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

export function ValidateDate(control: AbstractControl): ValidationErrors | null {
    const date: NgbDateStruct = control.value;
    if (!date.year || !date.month || date.day) {
        return {
            key: 'Date format is not recognized'
        };
    }
    try {
        const dateS = `${date.year}/${date.month}/${date.day}`;
        const d = new Date(dateS);
        return null;
    } catch (e) {
        return {
            key: 'Date is not correct'
        };
    }
}
