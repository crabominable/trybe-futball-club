const ValidateUserEmail = (data: Record<string, unknown> | any) => {
  if (!data.email) {
    return { message: 'All fields must be filled' };
  }
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  if (!data.email.match(EMAIL_REGEX)) {
    return { message: 'Incorrect email or password' };
  }
};

export default ValidateUserEmail;
