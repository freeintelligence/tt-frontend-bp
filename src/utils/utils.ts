import { FormGroup } from '@angular/forms';

export const markFormAsTouched = (form: FormGroup) => {
  Object.keys(form.controls).forEach((key) => {
    const control = form.get(key);
    control?.markAsTouched();
  });
};

export const currentDate = () => {
  return new Date().toISOString().substring(0, 10);
};

export const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().substring(0, 10);
};

export const randomString = (length: number) => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
