// 💙💛  Здесь создаем Mongoose модель.

import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import Joi from 'joi';

// Требования к модели, валидация для mongoose, валидация для сохраняется в БД.
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false, // устанавливает по умолчанию false
    },
  },
  { versionKey: false, timestamps: true } // запретить создавать версию, разрешить создавать дату создания/обновления
); // создаем схему (указать название поля и требование к полю)

contactSchema.post('save', handleMongooseError);

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
}); // схема требований к каждому полю объекта, приходящего от frontend

// Создаем класс, который будет работать с коллекцией 'contacts'
// С помощью схемы создаем модель (название - существительное в одненi).
// Первый аргумент: название коллекции в одненi (коллекция из MongoDB), Второй: схема
export const Contact = model('contact', contactSchema);
