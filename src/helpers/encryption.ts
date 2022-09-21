import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (e) {
    throw e;
  }
};

const comparePassword = (password, passwordHash) => {
  try {
    return bcrypt.compare(password, passwordHash);
  } catch (e) {
    throw e;
  }
};

export { hashPassword, comparePassword };
