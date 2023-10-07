const getUser = (email: string) => {
  return {
    email,
    password: '123456',
  };
};

const userService = { getUser };

export default userService;
