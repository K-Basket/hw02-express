import app from './app.js';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 3001 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, infoServer);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

function infoServer() {
  console.log('💙💛 Database connection successful: port: 3001');
}
