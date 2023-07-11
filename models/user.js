// 💙💛  Здесь создаем Mongoose модель для регистрации Users.

import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // выражение валидации email

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

// проверка наличия в DB e-mail

// Joi schema - на регистрацию
export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(), // pattern() - валидация e-mail
  password: Joi.string().min(6).required(),
});

// Joi schema - на логин
export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const User = model('user', userSchema);
