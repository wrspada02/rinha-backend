import httpMocks from 'node-mocks-http';
import { PeopleService } from '@/services/people';
import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';
import { PeopleController } from '@/controllers/people';
import { Response } from 'express';

describe('Person tests', () => {
    let peoples: Person[] = [];
    const mockPeopleRepository: jest.Mocked<PeopleRepository> = {
        createPerson: jest.fn().mockImplementation((person: Person) => {
            peoples.push(person);

            return person;
        }),
        getPeopleById: jest.fn().mockImplementation((id: string) => {
            return peoples.find(p => p.id === id);
        }),
        getPeopleByTerm: jest.fn().mockImplementation((term: string) => {
            return peoples.find(p => {
                return p.apelido === term 
                || p.id === term
                || p.nascimento === term
                || p.nome === term
                || p.nome === term
            });
        }),
        getPeopleCount: jest.fn().mockImplementation(() => {
            return peoples.length;
        }),
    };

    describe('Unit tests', () => {
        let peopleService: PeopleService;
    
        afterEach(() => {
            peoples = [
                { 
                    apelido: 'Test1', 
                    id: '1234', 
                    nascimento: '1200/12/12', 
                    nome: 'Test1', 
                    stack: []
                },
                { 
                    apelido: 'Test2', 
                    id: '2345', 
                    nascimento: '1200/12/12', 
                    nome: 'Test2', 
                    stack: []
                },
            ];
        });
            
        beforeAll(() => {
            peopleService = new PeopleService(mockPeopleRepository);
        });
    
        const getPersonObject = <Type extends keyof Person>(
            key?: Type,
            value?: Person[Type]
        ): Person => {
            let object: Person = {
                id: '123',
                apelido: 'Willzinn',
                nome: 'Willson',
                stack: ['Node.js', 'Php', 'Typescript', 'Laravel', 'Python'],
                nascimento: '1920-07-23',
            };
    
            if (!key) return object;
    
            object[key] = value as Person[Type];
            return object;
        };
    
        describe('POST - Create person', () => {
            it('should throw error if nickname is null', () => {
                const object = getPersonObject(
                    'apelido',
                    null as unknown as string
                );
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'apelido is null'
                );
            });
    
            it('should throw error if name is null', () => {
                const object = getPersonObject('nome', null as unknown as string);
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'nome is null'
                );
            });
    
            it('should throw error if nickname is not a string', () => {
                const object = getPersonObject('apelido', 123 as unknown as string);
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'apelido is not a string'
                );
            });
    
            it('should throw error if name is not a string', () => {
                const object = getPersonObject('nome', 123 as unknown as string);
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'nome is not a string'
                );
            });
    
            it('should throw error if date is not a valid date', () => {
                const object = getPersonObject('nascimento', '20/10/20');
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'nascimento is not a date'
                );
            });
    
            it('should throw error if stack is not an array of string', () => {
                const object = getPersonObject('stack', [
                    123 as unknown as string,
                    123 as unknown as string,
                    123 as unknown as string,
                ]);
    
                expect(() => peopleService.createPerson(object)).toThrow(
                    'stack is not a string'
                );
            });
    
            it('should not throw an error if data looks good', () => {
                const object = getPersonObject();
    
                expect(() => peopleService.createPerson(object)).not.toThrow(
                    'stack is not a string'
                );
            });
    
            it('should throw an error if data does not look good', () => {
                const object1 = getPersonObject('nascimento', '121212/12/12');
                const object2 = getPersonObject('nascimento', '1212/1212/12');
                const object3 = getPersonObject('nascimento', '1212/12/1212');
    
                expect(() => peopleService.createPerson(object1)).toThrow(
                    'nascimento is not a date'
                );
                expect(() => peopleService.createPerson(object2)).toThrow(
                    'nascimento is not a date'
                );
                expect(() => peopleService.createPerson(object3)).toThrow(
                    'nascimento is not a date'
                );
            });
    
            it('should return person object after success', () => {
                const object = getPersonObject();
                const person = peopleService.createPerson(object);
    
                expect(person).toBeDefined();
            });
        });
    
        describe('GET - By id', () => {
            it('should throw an error if no parameter passed', () => {
                expect(() => peopleService.getPersonById('')).toThrow('No id received');
            });
    
            it('should find an user', () => {
                expect(() => peopleService.getPersonById('1234')).not.toThrow('No user found');
            });
    
            it('should not find an user', () => {
                expect(() => peopleService.getPersonById('ウイリアン')).toThrow('No user found');
            });
        });
    
        describe('GET - By term', () => {
            it('should throw an error if no parameter passed', () => {
                expect(() => peopleService.getPeopleByTerm('')).toThrow('No term received');
            });
    
            it('should find an user', () => {
                expect(() => peopleService.getPeopleByTerm('1234')).not.toThrow('No user found');
            });
        });
    
        describe('GET - People count', () => {
            it('should return people count', async () => {
                const peopleCount = await peopleService.getPeopleCount();
    
                expect(peopleCount).toBe(2);
            });
        });
    });
    
    describe('Integrate tests', () => {
        let peopleController: PeopleController;
        let request;
        let response: Response;

        beforeEach(() => {
            response = httpMocks.createResponse();
        });

        afterEach(() => {
            peoples = [
                { 
                    apelido: 'Test1', 
                    id: '1234', 
                    nascimento: '1200/12/12', 
                    nome: 'Test1', 
                    stack: []
                },
                { 
                    apelido: 'Test2', 
                    id: '2345', 
                    nascimento: '1200/12/12', 
                    nome: 'Test2', 
                    stack: []
                },
            ];
        });
    
        beforeAll(() => {
            peopleController = new PeopleController(
                new PeopleService(mockPeopleRepository)
            );
        });
    
        describe('POST - Create person', () => {
            it('should return status 400', async () => {
                request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/pessoas',
                });

                await peopleController.handleCreatePerson(request, response);
                expect(response.statusCode).toBe(400);
            });
    
            it('should return status 422', async () => {
                request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/pessoas',
                    body: {
                        apelido: null, 
                        nascimento: '1200/12/12', 
                        nome: 'Test1', 
                        stack: []
                    },
                });

                await peopleController.handleCreatePerson(request, response);
                expect(response.statusCode).toBe(422);
            });
    
            it('should return status 201', async () => {
                request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/pessoas',
                    body: {
                        apelido: 'Test1', 
                        nascimento: '1200-12-12', 
                        nome: 'Test1', 
                        stack: []
                    },
                });

                await peopleController.handleCreatePerson(request, response);
                expect(response.statusCode).toBe(201);
            });

            it('should return status 201 with location header', async () => {
                request = httpMocks.createRequest({
                    method: 'POST',
                    url: '/pessoas',
                    body: {
                        apelido: 'Test1', 
                        nascimento: '1200-12-12', 
                        nome: 'Test1', 
                        stack: []
                    },
                });

                await peopleController.handleCreatePerson(request, response);
                expect(response.statusCode).toBe(201);
                expect(response.getHeader("Location")).toBeDefined();
            });
        });

        describe('GET - By id', () => {
            it('should return status 400', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/pessoas/',
                    params: {}
                });

                await peopleController.handleGetPersonById(request, response);
                expect(response.statusCode).toBe(400);
            });

            it('should return status 404', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/pessoas/',
                    params: {
                        id: 'asjdasd7uyhas',
                    },
                });

                await peopleController.handleGetPersonById(request, response);
                expect(response.statusCode).toBe(404);
            });

            it('should return status 200', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/pessoas/',
                    params: {
                        id: '1234',
                    },
                });

                await peopleController.handleGetPersonById(request, response);
                expect(response.statusCode).toBe(200);
            });
        });

        describe('GET - By term', () => {
            it('should return status 400', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/pessoas/',
                    query: {}
                });

                await peopleController.handleGetPeopleByTerm(request, response);
                expect(response.statusCode).toBe(400);
            });

            it('should return status 200', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/pessoas/',
                    query: {
                        t: '1234'
                    }
                });

                await peopleController.handleGetPeopleByTerm(request, response);
                expect(response.statusCode).toBe(200);
            });
        });

        describe('GET - People count', () => {
            it('should return status 200', async () => {
                request = httpMocks.createRequest({
                    method: 'GET',
                    url: '/contagem-pessoas',
                });

                await peopleController.handleGetPeopleCount(request, response);
                expect(response.statusCode).toBe(200);
            });
        });
    });
});


