import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { Validation } from '@/helpers/validation';

export class PeopleService {
    constructor(private peopleRepository: PeopleRepository) {}

    createPerson(person: Person) {
        Validation.ensureFieldsNotNull(person, ['apelido', 'nome']);
        Validation.validateTypeReceivedPerson(person, [
            'apelido',
            'nome',
            'nascimento',
            'stack',
        ]);

        const createdPerson = this.peopleRepository.createPerson(person);

        return createdPerson;
    }

    getPersonById(id: string) {
        if (!id) throw new Error('No id received');

        const person = this.peopleRepository.getPeopleById(id);

        if (!person) throw new Error('No user found');

        return person;
    }

    getPeopleByTerm(term: string) {
        return `A query enviada ${term}!`;
    }

    getPeopleCount() {
        return `Contando pessoas...`;
    }
}
