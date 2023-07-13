import express from 'express';
import { register, login, getCurrent } from '../../controllers/auth.js';
import { authenticate } from '../../middlewares/authenticate.js';

export const router = express.Router();

router.post('/register', register); // или /signup, регистрация пользователя

router.post('/login', login); // или /signin, авторизация пользователя

router.get('/current', authenticate, getCurrent); // проверяем актуальность токена
