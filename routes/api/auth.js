import express from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { upload } from '../../middlewares/upload.js';
import { register } from '../../controllers/auth/register.js';
import { login } from '../../controllers/auth/login.js';
import { getCurrent } from '../../controllers/auth/getCurrent.js';
import { logout } from '../../controllers/auth/logout.js';
import { subscription } from '../../controllers/auth/subscription.js';
import { updateAvatar } from '../../controllers/auth/updateAvatar.js';

export const router = express.Router();

router.post('/register', register); // или /signup, регистрация пользователя

router.post('/login', login); // или /signin, авторизация пользователя

router.get('/current', authenticate, getCurrent); // проверяем актуальность токена

router.post('/logout', authenticate, logout); // разлогинивание пользователя

router.patch('/users', authenticate, subscription); // подписка

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar); // upload.single означаетт, что из поля 'avatar' прийдет файл
