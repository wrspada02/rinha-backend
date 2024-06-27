export class NotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NOT_FOUND';
  }
}