const ValidateUserPassword = (data: Record<string, unknown> | any) => {
  if (!data.password) {
    return { message: 'All fields must be filled' };
  }
  if (data.password.length <= 6) {
    return { message: 'Incorrect email or password' };
  }
};

export default ValidateUserPassword;
