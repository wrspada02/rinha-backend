import { PeopleService } from '../services/people';
import { PeopleRepository } from '../repositories/people';

describe('Person service business rules', () => {
	let peopleService;
	
	beforeAll(() => {
		peopleService = new PeopleService(
			new PeopleRepository()
		);
	});

	describe('POST - Create person', () => {

		it('should throw 422 if nickname is null', () => {});

		it('should throw 422 if name is null', () => {});

		it('should throw 400 if nickname is not a string', () => {});

		it('should throw 400 if name is not a string', () => {});
			
		it('should throw 400 if date is not a string', () => {});

		it('should throw 400 if stack is not an array of string', () => {});
	});
});
