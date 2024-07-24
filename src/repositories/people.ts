import { Person } from '@/models/person';
import { PrismaClient } from '@prisma/client';

export class PeopleRepository {
    constructor(private readonly prisma: PrismaClient) {}

    createPerson(person: Omit<Person, 'id'>) {
        return this.prisma.person.create({ data: { ...person } });
    }

    getPeopleById(id: string) {
        return this.prisma.person.findUnique({ where: { id } });
    }

    getPeopleByTerm(term: string) {
        return this.prisma.person.findMany({
            where: {
                OR: [
                    { apelido: { contains: term, mode: 'insensitive' } },
                    { nome: { contains: term, mode: 'insensitive' } },
                    { stack: { has: term } }
                ]
            }
        });
    }

    getPeopleCount() {
        return this.prisma.person.count();
    }

    getHealthCheck() {
        return this.prisma.$queryRaw`SELECT 1`;
    }
}
