import StatusCode from '../utils';

// eslint-disable-next-line import/no-cycle
import { ErrorCatcherMiddleware } from '../middlewares';

class ValidateId {
  private _errorCatcher = ErrorCatcherMiddleware;

  private _httpStatusCode = StatusCode;

  handle(
    id: string,
  ) {
    if (Number.isNaN(Number(id))) {
      return new this._errorCatcher(
        this._httpStatusCode.NotAuthorized,
        'id must be a number',
      );
    }
  }
}

export default ValidateId;
