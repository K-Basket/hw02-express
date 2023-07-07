export const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

// т.к. функция создает новый объект ее принято называть с большой буквы.
