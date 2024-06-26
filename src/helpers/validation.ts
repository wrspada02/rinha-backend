import { Person } from "@/models/person";

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

  static ensureFieldsNotNull(person: Person, fields: (keyof Person)[]): void {
    fields.forEach(field => {
      if (person[field] === null) {
        throw new Error(`${field} is null`);
      }
    });
  }

	static validateTypeReceivedPerson(person: Person, fields: (keyof Person)[]) {
		fields.forEach(field => {
			switch (field) {
				case 'nascimento':
					if (!Validation.isDate(person[field])) {
						throw new Error(`${field} is not a date`);
					}
					break;

				default:
					if (!Validation.isString(person[field])) {
							throw new Error(`${field} is not a string`);
						}
				}
		});
	}
}

