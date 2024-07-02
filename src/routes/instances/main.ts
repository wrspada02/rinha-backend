import { PeopleRepository } from '@/repositories/people';
import { PeopleService } from '@/services/people';
import { PeopleController } from '@/controllers/people';
import prisma from '../../../prisma/client';

const peopleRepository = new PeopleRepository(prisma);
const peopleService = new PeopleService(peopleRepository);
const peopleController = new PeopleController(peopleService);

export { peopleController };
