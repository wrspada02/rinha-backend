export class Validation {
  static isString(value: unknown) {
    if (Array.isArray(value)) {
      return value.every(word => typeof word === 'string');
    }
  
    return typeof value === 'string';
  }
  
  static isDate(value: unknown) {
    const regex = new RegExp(/\d{4}\/\d{2}\/\d{2}/);
  
    return regex.test(String(value));
  }
}

