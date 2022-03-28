import { UserResponseInterface } from '../../interfaces';

// This package contains type definitions for Express
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserResponseInterface
  }
}
