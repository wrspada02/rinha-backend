import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';

export class PeopleService {
	constructor(private peopleRepository: PeopleRepository) {}

	async createPerson(person: Person) {	
		return `Usuario criado!`;
	}

	async getPersonById(id: number) {
		return `O usuário id procurado ${id}`;
	}

	async getPeopleByTerm(term: string) {
		return `A query enviada ${term}!`;
	}

	async getPeopleCount() {
		return `Contando pessoas...`;
	}
}
