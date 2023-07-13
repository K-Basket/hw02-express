import express from 'express';
import {
  addContact,
  getById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from '../../controllers/contacts.js';
import { authenticate } from '../../middlewares/authenticate.js';

export const router = express.Router(); // Создает объект мини-приложения, который передаем в app.js

// router.use(authenticate);

// если функциия authenticate выполнена, тогда переходим к следующей функции (listContacts) итд.
router.get('/', authenticate, listContacts); // !!! второй, третий итд параметры - callback !!! // authenticate: middleware проверяетс валидность токена пришедшего от backend

router.get('/:contactId', authenticate, getById);

router.post('/', authenticate, addContact);

router.put('/:contactId', authenticate, updateContact);

router.patch('/:contactId/favorite', authenticate, updateStatusContact);

router.delete('/:contactId', authenticate, removeContact);
