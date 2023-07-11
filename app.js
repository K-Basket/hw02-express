import express from 'express';
import morgan from 'morgan';
const logger = morgan; // выводит в консоль инфомрацию про запросы CRUD
import cors from 'cors';
import { router as contactsRouter } from './routes/api/contacts.js'; // импортируем роуты работы с маршрутами
import { configDotenv } from 'dotenv'; // для записи в .env секретных данных

configDotenv(); // передача данных из файла / .env / в глобальную Переменную окружения, из которого server.js берет секретные данные

const app = express(); // app - создан web-сервер
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors()); // передаем middleware функцию cors, после чего блокировка сервером не производится.
app.use(express.json()); // парсер JSON, интерпретирует значение req.body в формат json
app.use('/api/contacts', contactsRouter); // когда прийдет запрос, который начинается с "/api/contacts" ищи его обработчик в contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
}); // функция обработки ошибок

export default app; // экспортируем web-server для запуска в файле server.js
