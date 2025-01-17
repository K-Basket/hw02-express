// т.к. monngoose возвращает 500 ошибку, эта функция позволяет дать правильный статус ошибке.
export const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = status;

  next();
};
