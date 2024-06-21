import express from 'express';
import { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
