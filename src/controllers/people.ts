import { Request, Response } from 'express';
import { PeopleService } from '@/services/people';
import { Person } from '@/models/person';

export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    async handleCreatePerson(req: Request, res: Response) {
        try {
            const person = req.body as Omit<Person, 'id'>;
            const response = await this.peopleService.createPerson(person);

            return res.send(response);
        } catch (e: unknown) {
            console.log(e);
            return res.status(404).send({ message: e });
        }
    }

    async handleGetPersonById(req: Request, res: Response) {
        const id = req.params.id;
        const response = await this.peopleService.getPersonById(id);

        return res.send(response);
    }

    async handleGetPeopleByTerm(req: Request, res: Response) {
        const { t } = req.query;
        const response = await this.peopleService.getPeopleByTerm(t as string);

        return res.send(response);
    }

    async handleGetPeopleCount(req: Request, res: Response) {
        const response = await this.peopleService.getPeopleCount();

        return res.send(response);
    }
}
