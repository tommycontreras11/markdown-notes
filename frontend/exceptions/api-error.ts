export class ApiError<T = unknown> extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: T,
  ) {
    super(message);
    this.name = "ApiError";
  }
}