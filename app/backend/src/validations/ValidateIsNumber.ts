import StatusCode from '../utils';

// eslint-disable-next-line import/no-cycle
import { ErrorCatcherMiddleware } from '../middlewares';

class ValidateIsNumber {
  private _errorCatcher = ErrorCatcherMiddleware;

  private _httpStatusCode = StatusCode;

  handle(
    data: string | object | undefined | null | number | boolean,
    field: string,
  ): string | number | boolean | object | ErrorCatcherMiddleware | null | undefined {
    if (Number.isNaN(Number(data))) {
      return new this._errorCatcher(
        this._httpStatusCode.NotAuthorized,
        `'${field}' must be a number`,
      );
    }

    return data;
  }
}

export default ValidateIsNumber;
