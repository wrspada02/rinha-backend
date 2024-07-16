import { Person } from '@/models/person';
import { PrismaClient } from '@prisma/client';

export class PeopleRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
        return await this.prisma.person.create({ data: { ...person } });
    }

    async getPeopleById(id: string): Promise<Person | null> {
        return await this.prisma.person.findFirst({ where: { id }});
    }

    async getPeopleByTerm(term: string): Promise<Person[]> {
        return await this.prisma.person.findMany({ where: { OR: [{ apelido: term }, { nome: term }, { stack: { has: term } }]}});
    }

    async getPeopleCount(): Promise<number> {
        return await this.prisma.person.count();
    }

    async getHealthCheck() {
        return await this.prisma.$queryRaw`SELECT 1`;
    }
}
