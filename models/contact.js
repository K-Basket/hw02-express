// 💙💛  Здесь создаем Mongoose модель.

import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

// Требования к модели, валидация для mongoose, валидация выполняется перед сохранением в MongoDB.
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false, // устанавливает по умолчанию false
    },
    owner: {
      type: Schema.Types.ObjectId, // здесь будет сохраняться id, котторый генерит MongoDB
      ref: 'user', // название коллекции с которой будет это id
      required: true,
    }, // данные залогиненого пользователя
  },
  { versionKey: false, timestamps: true } // запретить создавать версию, разрешить создавать дату создания/обновления
); // создаем схему (указать название поля и требование к полю)

contactSchema.post('save', handleMongooseError);

export const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
}); // валидация данных приходящих от frontend

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// Создаем класс, который будет работать с коллекцией 'contacts'
// С помощью схемы создаем модель (название - существительное в одненi).
// Первый аргумент: название коллекции в одненi (коллекция из MongoDB), Второй: схема
export const Contact = model('contact', contactSchema);
