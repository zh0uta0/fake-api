export class ServerError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class ParamsError extends ServerError {
  constructor(message: string = "参数错误") {
    super(message, 401);
  }
}
