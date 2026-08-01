export class ApiError extends Error {
  status: number;
  code: string;
  details?: { field: string; message: string }[];

  constructor(
    message: string,
    status: number,
    code: string,
    details?: { field: string; message: string }[]
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }

  get isAuthError() {
    return this.status === 401;
  }

  get isValidationError() {
    return this.status === 422 || this.code === "VALIDATION_ERROR";
  }

  get isRateLimited() {
    return this.status === 429;
  }

  /** First field-level validation message, if any — handy for simple form errors. */
  fieldMessage(field: string) {
    return this.details?.find((d) => d.field === field)?.message;
  }
}

export class NetworkError extends ApiError {
  constructor() {
    super("Network error. Check your connection and try again.", 0, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}
