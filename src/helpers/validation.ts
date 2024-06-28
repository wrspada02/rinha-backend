import { BadRequest } from '@/exceptions/BadRequest';
import { UnprocessableEntity } from '@/exceptions/UnprocessableEntity';
import { Person } from '@/models/person';

export class Validation {
    static isString(value: unknown) {
        if (Array.isArray(value)) {
            return value.every((word) => typeof word === 'string');
        }

        return typeof value === 'string';
    }

    static isDate(value: unknown) {
        const regex = new RegExp(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/);

        return regex.test(String(value));
    }

    static ensureFieldsNotNull(person: Omit<Person, 'id'>, fields: (keyof Omit<Person, 'id'>)[]): void {
        fields.forEach((field) => {
            if (person[field] === null) {
                throw new UnprocessableEntity(`${field} is null`);
            }
        });
    }

    static checkTypeReceived(
        person: Omit<Person, 'id'>,
        fields: (keyof Omit<Person, 'id'>)[]
    ) {
        fields.forEach((field) => {
            switch (field) {
                case 'nascimento':
                    if (!Validation.isDate(person[field])) {
                        throw new BadRequest(`${field} is not a date`);
                    }
                    break;

                default:
                    if (!Validation.isString(person[field])) {
                        throw new BadRequest(`${field} is not a string`);
                    }
            }
        });
    }
}
