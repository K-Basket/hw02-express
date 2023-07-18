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
import { isValidId } from '../../middlewares/isValidId.js';

export const router = express.Router(); // Создает объект мини-приложения, который передаем в app.js

router.get('/', authenticate, listContacts);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, addContact);

router.put('/:contactId', authenticate, isValidId, updateContact);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  updateStatusContact
);

router.delete('/:contactId', authenticate, isValidId, removeContact);
