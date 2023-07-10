export const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

// когда при сохранении в модели образовалась ошибка, тогда пусть сработает middleware (collback)
// т.к. monngoose возвращает 500 ошибку, эта функция позволяет дать правильный статус ошибке.
