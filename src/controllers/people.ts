import { Request, Response } from 'express';
import { PeopleService } from '@/services/people';

export class PeopleController {
	constructor(private peopleService: PeopleService) {}

	async handleCreatePerson(req: Request, res: Response) {
		return res.send(`Usuario criado!`);
	}

	async handleGetPersonById(req: Request, res: Response) {
		const id = req.params.id;

		return res.send(`O usuário id procurado ${id}`);
	}

	async handleGetPeopleByTerm(req: Request, res: Response) {
		const { t } = req.query;

		return res.send(`A query enviada ${t}!`);
	}

	async handleGetPeopleCount(req: Request, res: Response) {
		return res.send(`Contando pessoas...`);
	}
}
