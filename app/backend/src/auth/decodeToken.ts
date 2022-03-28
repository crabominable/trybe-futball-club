import * as jwt from 'jsonwebtoken';

import { readFileSync } from 'fs';

import { UserResponseInterface } from '../interfaces';

const decodeToken = (token: string): UserResponseInterface | string => {
  try {
    const secret = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

    const { id, role, email, username } = jwt.verify(token, secret) as jwt.JwtPayload;

    const userDataDecoded = { id, role, email, username };

    return userDataDecoded;
  } catch (error) {
    return 'Something went wrong';
  }
};

export default decodeToken;
