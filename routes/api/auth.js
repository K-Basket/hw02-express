import express from 'express';
import {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  updateAvatar,
} from '../../controllers/auth.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { upload } from '../../middlewares/upload.js';

export const router = express.Router();

router.post('/register', register); // или /signup, регистрация пользователя

router.post('/login', login); // или /signin, авторизация пользователя

router.get('/current', authenticate, getCurrent); // проверяем актуальность токена

router.post('/logout', authenticate, logout); // разлогинивание пользователя

router.patch('/users', authenticate, subscription); // подписка

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar); // upload.single означаетт, что из поля 'avatar' прийдет файл
