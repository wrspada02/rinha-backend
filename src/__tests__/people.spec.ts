import { PeopleService } from '@/services/people';
import { PeopleRepository } from '@/repositories/people';

describe('Person service business rules', () => {
	let peopleService: PeopleService;
	
	beforeAll(() => {
		peopleService = new PeopleService(
			new PeopleRepository()
		);
	});

	describe('POST - Create person', () => {
		it('should throw error if nickname is null', () => {
			const object = {
				apelido: null as unknown as string, 
				nome: 'Willson',
			  nascimento: '23/07/1920', 
				stack: [],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('apelido is null');
		});

		it('should throw error if name is null', () => {
			const object = {
				apelido: 'Will', 
				nome: null as unknown as string,
			  nascimento: '23/07/1920', 
				stack: [],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('nome is null');
		});

		it('should throw error if nickname is not a string', () => {
			const object = {
				apelido: 123 as unknown as string, 
				nome: '',
			  nascimento: '23/07/1920', 
				stack: [],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('apelido is not a string');
		});

		it('should throw error if name is not a string', () => {
			const object = {
				apelido: '', 
				nome: 123 as unknown as string,
			  nascimento: '23/07/1920', 
				stack: [],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('nome is not a string');
		});
			
		it('should throw error if date is not a valid date', () => {
			const object = {
				apelido: '', 
				nome: '',
			  nascimento: '23/07/20', 
				stack: [],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('nascimento is not a date');
		});

		it('should throw error if stack is not an array of string', () => {
			const object = {
				apelido: '', 
				nome: '',
			  nascimento: '1920/10/10', 
				stack: [123, 123, 123] as unknown as string[],   	
			};

			expect(() => peopleService.createPerson(object))
				.toThrow('stack is not a string');
		});

		it('should not throw an error if data looks good', () => {
			const object = {
				apelido: 'Willzonn', 
				nome: 'William',
			  nascimento: '1920/10/10', 
				stack: ['Node.js', 'Php', 'Typescript', 'Laravel', 'Python'],   	
			};

			expect(() => peopleService.createPerson(object)).not
				.toThrow('stack is not a string');
		});
	});
});
