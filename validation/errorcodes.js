const INCORRECT_DATA_ERROR = {
  code: 400,
  message: 'Переданы некорректные данные.',
};

const LOGIN_FAILED = {
  code: 401,
  message: 'Не верное имя пользователя или пароль.',
};

const NOT_AUTORISATION = {
  code: 401,
  message: 'Отсутствует авторизация.',
};

const NOT_FOUND_ERROR = {
  code: 404,
  message: 'Обьект не найден.',
};

const FORBIDDEN_ERROR = {
  code: 403,
  message: 'Недостаточно прав.',
};

const CONFLICT_ERROR = {
  code: 409,
  message: 'Конфликт данных.',
};

const SERVER_ERROR = {
  code: 500,
  message: 'Внутренняя ошибка сервера.',
};

const INCORRECT_DBDATA_ERROR = {
  code: 500,
  message: 'Внутренняя ошибка базы.',
};

module.exports = {
  INCORRECT_DATA_ERROR,
  LOGIN_FAILED,
  NOT_AUTORISATION,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  CONFLICT_ERROR,
  INCORRECT_DBDATA_ERROR,
};
