export class UnprocessableEntity extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UNPROCESSABLE_ENTITY';
  }
}