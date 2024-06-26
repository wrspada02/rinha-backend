import { Person } from '@/models/person';

export class PeopleRepository {
    async createPerson(person: Person) {}

    async getPeopleById(id: string) {}

    async getPeopleByTerm(term: string) {}

    async getPeopleCount() {}
}
