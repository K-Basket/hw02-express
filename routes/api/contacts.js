import express from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { listContacts } from '../../controllers/contacts/listContacts.js';
import { getById } from '../../controllers/contacts/getById.js';
import { addContact } from '../../controllers/contacts/addContact.js';
import { updateContact } from '../../controllers/contacts/updateContact.js';
import { updateStatusContact } from '../../controllers/contacts/updateStatusContact.js';
import { removeContact } from '../../controllers/contacts/removeContact.js';

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
