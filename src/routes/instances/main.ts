import { PeopleRepository } from '@/repositories/people';
import { PeopleService } from '@/services/people';
import { PeopleController } from '@/controllers/people';

const peopleRepository = new PeopleRepository();
const peopleService = new PeopleService(peopleRepository);
const peopleController = new PeopleController(peopleService);

export { peopleController };

