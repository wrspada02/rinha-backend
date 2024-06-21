import express, { Request, Response } from 'express';
import pessoas from './routes/people';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(pessoas);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
