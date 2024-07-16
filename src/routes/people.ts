import { Router, Request, Response } from 'express';
import { peopleController } from './instances/main';

const router = Router();

router.post('/pessoas', (req: Request, res: Response) => {
    return peopleController.handleCreatePerson(req, res);
});

router.get('/pessoas/:id', (req: Request, res: Response) => {
    return peopleController.handleGetPersonById(req, res);
});

router.get('/pessoas', (req: Request, res: Response) => {
    return peopleController.handleGetPeopleByTerm(req, res);
});

router.get('/contagem-pessoas', (req: Request, res: Response) => {
    return peopleController.handleGetPeopleCount(req, res);
});

router.get('/health-check', (req: Request, res: Response) => {
    return peopleController.getHealthCheck(req, res);
});

export default router;
