import { PeopleRepository } from '@/repositories/people';

import { Person } from '@/models/person';

export class PeopleService {
	constructor(private peopleRepository: PeopleRepository) {}

	async createPerson(person: Person) {}

	async getPeopleById(id: number) {}

	async getPeopleByTerm(term: string) {}

	async getPeopleCount() {}
}
