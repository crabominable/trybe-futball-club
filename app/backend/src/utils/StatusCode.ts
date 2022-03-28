enum StatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotAuthorized,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export default StatusCode;
