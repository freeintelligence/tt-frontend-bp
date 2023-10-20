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

export const cloneDeep = <T>(source: T): T => {
  if (source === null || typeof source !== 'object' || source instanceof Date) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map((item) => cloneDeep(item)) as T;
  }

  if (typeof source === 'object') {
    const clonedObj: any = {};

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        clonedObj[key] = cloneDeep(source[key]);
      }
    }

    return clonedObj as T;
  }

  return source;
};
