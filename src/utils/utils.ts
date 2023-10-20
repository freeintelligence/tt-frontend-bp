import { FormGroup } from '@angular/forms';

export const markFormAsTouched = (form: FormGroup) => {
  Object.keys(form.controls).forEach((key) => {
    const control = form.get(key);
    control?.markAsTouched();
  });
};

export const currentDate = () => {
  return substringDate(new Date());
};

export const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return substringDate(d);
};

export const substringDate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};

export const dateStringToDateLocaleString = (
  dateAsString: string,
  reverse: boolean = false
) => {
  const str = new Date(dateAsString).toLocaleDateString();

  if (!reverse) {
    return str;
  }

  return str.split('-').reverse().join('-');
};

export const randomString = (length: number) => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
