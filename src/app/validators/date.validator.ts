import { AbstractControl, ValidationErrors } from '@angular/forms';


export function ValidateDate(control: AbstractControl): ValidationErrors | null {
    try {
        const d = new Date(control.value).getTime();
        return null;
    } catch (e) {
        return {
            key: 'Date is not correct'
        };
    }
}
