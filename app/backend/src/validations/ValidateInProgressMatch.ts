const ValidateInProgressMatch = (inProgress: string | any) => {
  const IN_PROGRESS_REGEX = /^(true|false)$/i;

  if (!inProgress.toString().match(IN_PROGRESS_REGEX)) {
    return { message: '\'inProgress\' must have \'true\' or \'false\'' };
  }
};

export default ValidateInProgressMatch;
