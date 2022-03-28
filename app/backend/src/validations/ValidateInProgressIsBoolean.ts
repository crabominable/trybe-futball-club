const ValidateInProgressIsBoolean = (inProgress: boolean | any) => {
  if (typeof inProgress !== 'boolean') {
    return { message: 'There is no team with such id!' };
  }
};

export default ValidateInProgressIsBoolean;
