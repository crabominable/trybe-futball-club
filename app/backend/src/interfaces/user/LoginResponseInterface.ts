import UserResponseInterface from './UserResponseInterface';

interface LoginResponseInterface {
  user: UserResponseInterface;
  token: string;
}

export default LoginResponseInterface;
