import app from './app.js';
import mongoose from 'mongoose';

const { DB_HOST } = process.env; // глобальный объект - Environment (Переменная окружения)

mongoose.set('strictQuery', true);

// подключение к базе данных MongoDB
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, infoServer);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1); // закрывает запущенные процессы, (1) - означает что закрыто с неизвестной ошибкой
  });

function infoServer() {
  console.log('Server running. Port: 3000');
}
