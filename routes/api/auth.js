import express from 'express';
import { register, login } from '../../controllers/auth.js';

export const router = express.Router();

router.post('/register', register); // или /signup, регистрация пользователя

router.post('/login', login); // или /signin, авторизация пользователя
