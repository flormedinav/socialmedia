export const userWithoutPasswordFunction = (user) => {
  return {
    ...user.toObject(),
    password: undefined,
  };
};
