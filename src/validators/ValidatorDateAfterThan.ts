import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidatorDateAfterThan(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateControl = new Date(control.value);
    const timeControl = dateControl.getTime();

    if (!isNaN(timeControl) && timeControl < date.getTime()) {
      return { dateAfterThan: true };
    }

    return null;
  };
}
