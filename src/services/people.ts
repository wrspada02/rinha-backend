import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { Validation } from '@/helpers/validation';

export class PeopleService {
	constructor(private peopleRepository: PeopleRepository) {}

	createPerson(person: Person) {
		Validation.ensureFieldsNotNull(person, ['apelido', 'nome']);
		Validation.validateTypeReceivedPerson(
			person, 
			['apelido', 'nome', 'nascimento', 'stack']
		);
		
		return `Usuario criado!`;
	}

	getPersonById(id: string) {
		if (!id) throw new Error('No id found');

		return `O usuário id procurado ${id}`;
	}

	getPeopleByTerm(term: string) {
		return `A query enviada ${term}!`;
	}

	getPeopleCount() {
		return `Contando pessoas...`;
	}
}
