const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;

// т.к. функция создает новый объект ее принято называть с большой буквы.
