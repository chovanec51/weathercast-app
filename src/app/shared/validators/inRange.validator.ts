import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const InRangeValidator = (minRange: number, maxRange: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value: number = Number(control.value);
        if (isNaN(value)) { 
            return null;
        }
        
        if (minRange <= value && value <= maxRange) {
            return null;
        }

        return { 'invalid': 'outsideOfRange' };
    }
}