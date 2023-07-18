const errorMessageList = {
  404: 'Bad  Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

export const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

// т.к. функция создает новый объект ее принято называть с большой буквы.
