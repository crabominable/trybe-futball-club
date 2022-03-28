interface UserResponseInterface {
  id: number;
  username: string;
  role: string;
  email: string;
  match?(): string,
}

export default UserResponseInterface;
