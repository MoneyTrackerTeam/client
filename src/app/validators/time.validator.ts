import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbTimeStruct } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

export function ValidateTime(control: AbstractControl): ValidationErrors | null {
    const time: NgbTimeStruct = control.value;
    if (!time.hour || !time.minute) {
        return {
            key: 'Time format is incorrect'
        };
    }
    if (time.hour > 24 || time.hour < 1) {
        return {
            key: 'Day has only 24 hours'
        };
    }
    if (time.minute > 60 || time.minute < 0) {
        return {
            key: 'Hour can can have only 60 minutes'
        };
    }
    return null;
}
