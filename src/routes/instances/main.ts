import { PeopleRepository } from '@/repositories/people';
import { PeopleService } from '@/services/people';
import { PeopleController } from '@/controllers/people';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const peopleRepository = new PeopleRepository(prisma);
const peopleService = new PeopleService(peopleRepository);
const peopleController = new PeopleController(peopleService);

export { peopleController };
