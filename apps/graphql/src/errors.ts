export interface ErrorJSON {
  name: string;
  message: string;
  stack?: string;
  statusCode?: number;
}

export class SDKError extends Error {
  public readonly statusCode?: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = "SDKError";
    this.statusCode = code;
  }
  public toJSON(): { error: ErrorJSON } {
    const error: ErrorJSON = {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };

    if (this.statusCode) {
      error.statusCode = this.statusCode;
    }
    return {
      error,
    };
  }
}

export class AuthenticationError extends SDKError {
  constructor(message: string) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export class ForbiddenError extends SDKError {
  constructor(message: string) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}
