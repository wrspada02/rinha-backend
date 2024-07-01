import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { Validation } from '@/helpers/validation';
import { NotFound } from '@/exceptions/NotFound';
import { BadRequest } from '@/exceptions/BadRequest';

export class PeopleService {
    constructor(private peopleRepository: PeopleRepository) {}

    async createPerson(person: Omit<Person, 'id'>) {
        Validation.ensureFieldsNotNull(person, ['apelido', 'nome']);
        Validation.checkTypeReceived(person, [
            'apelido',
            'nome',
            'nascimento',
            'stack',
        ]);

        const createdPerson = await this.peopleRepository.createPerson(person);

        return createdPerson;
    }

    async getPersonById(id: string) {
        if (!id) throw new BadRequest('No id received');

        const person = await this.peopleRepository.getPeopleById(id);

        if (!person) throw new NotFound('No user found');

        return person;
    }

    async getPeopleByTerm(term: string) {
        if (!term) throw new BadRequest('No term received');

        const person = await this.peopleRepository.getPeopleByTerm(term);
        
        return person;
    }

    async getPeopleCount() {
        const peopleCount = await this.peopleRepository.getPeopleCount();
        
        return peopleCount;
    }
}
