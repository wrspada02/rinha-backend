import { PeopleService } from '@/services/people';
import { PeopleRepository } from '@/repositories/people';
import { Person } from '@/models/person';

describe('Person service business rules', () => {
	let peopleService: PeopleService;
	
	beforeAll(() => {
		peopleService = new PeopleService(
			new PeopleRepository()
		);
	});

	const getPersonObject = <Type extends keyof Person>(key?: Type, value?: Person[Type]): Person => {
		let object: Person = {
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
			const object = getPersonObject('apelido', null as unknown as string);

			expect(() => peopleService.createPerson(object))
				.toThrow('apelido is null');
		});

		it('should throw error if name is null', () => {
			const object = getPersonObject('nome', null as unknown as string);

			expect(() => peopleService.createPerson(object))
				.toThrow('nome is null');
		});

		it('should throw error if nickname is not a string', () => {
			const object = getPersonObject('apelido', 123 as unknown as string);

			expect(() => peopleService.createPerson(object))
				.toThrow('apelido is not a string');
		});

		it('should throw error if name is not a string', () => {
			const object = getPersonObject('nome', 123 as unknown as string);

			expect(() => peopleService.createPerson(object))
				.toThrow('nome is not a string');
		});
			
		it('should throw error if date is not a valid date', () => {
			const object = getPersonObject('nascimento', '20/10/20');

			expect(() => peopleService.createPerson(object))
				.toThrow('nascimento is not a date');
		});

		it('should throw error if stack is not an array of string', () => {
			const object = getPersonObject('stack', [123 as unknown as string, 123 as unknown as string, 123 as unknown as string]);

			expect(() => peopleService.createPerson(object))
				.toThrow('stack is not a string');
		});

		it('should not throw an error if data looks good', () => {
			const object = getPersonObject();

			expect(() => peopleService.createPerson(object)).not
				.toThrow('stack is not a string');
		});
	});

	describe('GET - By id', () => {
		it('should throw an error if no parameter passed', () => {});

		it('should find user', () => {});
	});
});
