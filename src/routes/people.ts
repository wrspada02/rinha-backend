import { Router, Request, Response } from 'express';

const router = Router();

router.post('/pessoas', (req: Request, res: Response) => {
	const person = req.body;

	return res.send(`O corpo da requisicao ${person}`);
});

router.get('/pessoas/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	return res.send(`A busca do usuario ${id}`);
});

router.get('/pessoas', (req: Request, res: Response) => {
	const { t } = req.query;

	return res.send(`A query enviada ${t}!`);
});

router.get('/contagem-pessoas', (req: Request, res: Response) => {
	return res.send(`Contando pessoas...`);
});

export default router;

