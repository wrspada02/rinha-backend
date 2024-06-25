import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { Validation } from '@/helpers/validation';

export class PeopleService {
	constructor(private peopleRepository: PeopleRepository) {}

	private ensureFieldsNotNull(person: Person, fields: (keyof Person)[]): void {
    fields.forEach(field => {
      if (person[field] === null) {
        throw new Error(`${field} is null`);
      }
    });
  }

	private validateTypeReceivedPerson(person: Person, fields: (keyof Person)[]) {
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

	createPerson(person: Person) {
		this.ensureFieldsNotNull(person, ['apelido', 'nome']);
		this.validateTypeReceivedPerson(
			person, 
			['apelido', 'nome', 'nascimento', 'stack']
		);
		
		return `Usuario criado!`;
	}

	getPersonById(id: number) {
		return `O usuário id procurado ${id}`;
	}

	getPeopleByTerm(term: string) {
		return `A query enviada ${term}!`;
	}

	getPeopleCount() {
		return `Contando pessoas...`;
	}
}
