import app from './app.js';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 3000 } = process.env; // берем данные из глобального объекта - Environment (Переменная окружения)

mongoose.set('strictQuery', true);

// подключение к базе данных MongoDB
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, infoServer);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1); // закрывает запущенные процессы, (1) - означает что закрыто с неизвестной ошибкой
  });

function infoServer() {
  console.log('Database connection successful');
}
