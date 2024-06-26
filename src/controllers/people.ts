import { Request, Response } from 'express';
import { PeopleService } from '@/services/people';

export class PeopleController {
    constructor(private peopleService: PeopleService) {}

    async handleCreatePerson(req: Request, res: Response) {
        const response = await this.peopleService.createPerson({
            apelido: 'Willzin',
            nome: 'William',
            nascimento: '10/11/2002',
            stack: ['Typescript', 'PHP', 'Node.js', 'React.js', 'Nest.js'],
        });

        return res.send(response);
    }

    async handleGetPersonById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
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
