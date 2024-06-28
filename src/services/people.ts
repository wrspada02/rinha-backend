import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { Validation } from '@/helpers/validation';
import { NotFound } from '@/exceptions/NotFound';
import { BadRequest } from '@/exceptions/BadRequest';

export class PeopleService {
    constructor(private peopleRepository: PeopleRepository) {}

    createPerson(person: Omit<Person, 'id'>) {
        Validation.ensureFieldsNotNull(person, ['apelido', 'nome']);
        Validation.checkTypeReceived(person, [
            'apelido',
            'nome',
            'nascimento',
            'stack',
        ]);

        const createdPerson = this.peopleRepository.createPerson(person);

        return createdPerson;
    }

    getPersonById(id: string) {
        if (!id) throw new BadRequest('No id received');

        const person = this.peopleRepository.getPeopleById(id);

        if (!person) throw new NotFound('No user found');

        return person;
    }

    getPeopleByTerm(term: string) {
        if (!term) throw new BadRequest('No term received');

        const person = this.peopleRepository.getPeopleByTerm(term);

        if (!person) throw new NotFound('No user found');
        
        return person;
    }

    getPeopleCount() {
        const peopleCount = this.peopleRepository.getPeopleCount();
        
        return peopleCount;
    }
}
