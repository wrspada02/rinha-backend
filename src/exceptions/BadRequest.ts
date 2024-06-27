export class BadRequest extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BAD_REQUEST';
  }
}