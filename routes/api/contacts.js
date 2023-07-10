import express from 'express';
import {
  addContact,
  getById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
} from '../../controllers/contacts.js';

export const router = express.Router(); // Создает объект мини-приложения, который передаем в app.js

router.get('/', listContacts); // !!! второй параметр - callback !!!

router.get('/:contactId', getById);

router.post('/', addContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', updateStatusContact);

router.delete('/:contactId', removeContact);
