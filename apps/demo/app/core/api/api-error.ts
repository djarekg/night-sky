export class ApiError extends Error {
  status: number;
  data: unknown | null;

  constructor(status: number, message: string, data: unknown | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}
