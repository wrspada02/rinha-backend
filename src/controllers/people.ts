import { Request, Response } from 'express';
import { PeopleService } from '@/services/people';
import { Person } from '@/models/person';
import { BadRequest } from '@/exceptions/BadRequest';
import { UnprocessableEntity } from '@/exceptions/UnprocessableEntity';
import { NotFound } from '@/exceptions/NotFound';

export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    async handleCreatePerson(req: Request, res: Response) {
        try {
            const person = req.body as Omit<Person, 'id'>;
            const response = await this.peopleService.createPerson(person);

            return res.status(201).send(response);
        } catch (e: unknown) {
            if (e instanceof BadRequest) return res.status(400).send({ message: e });
            else if (e instanceof UnprocessableEntity) return res.status(422).send({ message: e });
            else return res.status(500).send('Internal server error');
        }
    }

    async handleGetPersonById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const response = await this.peopleService.getPersonById(id);

            return res.send(response);
        } catch (e: unknown) {
            if (e instanceof BadRequest) return res.status(400).send({ message: e });
            else if (e instanceof NotFound) return res.status(404).send({ message: e });
            else return res.status(500).send('Internal server error');
        }
    }

    async handleGetPeopleByTerm(req: Request, res: Response) {
        try {
            const { t } = req.query;
            const response = await this.peopleService.getPeopleByTerm(t as string);

            return res.send(response);
        } catch (e: unknown) {
            if (e instanceof BadRequest) return res.status(400).send({ message: e });
            else res.status(500).send('Internal server error');
        }
    }

    async handleGetPeopleCount(req: Request, res: Response) {
        const response = await this.peopleService.getPeopleCount();
        
        return res.send({ amount: response });
    }
}
