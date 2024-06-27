import { PeopleService } from '@/services/people';
import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';

describe('Person service business rules', () => {
    let peopleService: PeopleService;
    let peoples: Person[] = [];

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
            nascimento: '1920/07/23',
            stack: ['Node.js', 'Php', 'Typescript', 'Laravel', 'Python'],
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

        it('should not find an user', () => {
            expect(() => peopleService.getPeopleByTerm('ウイリアン')).toThrow('No user found');
        });
    });

    describe('GET - People count', () => {
        it('should return people count', () => {
            const peopleCount = peopleService.getPeopleCount();

            expect(peopleCount).toBe(2);
        });
    });
});
