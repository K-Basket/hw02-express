import { HttpError } from '../helpers/HttpError.js';
import { Contact, addSchema, updateFavoriteSchema } from '../models/contact.js';
import { isValidId } from '../helpers/isValidId.js';

export async function listContacts(req, res, next) {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt'); // возвращаем все контакты из базы данных

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params

    isValidId(contactId, next);

    // const result = await Contact.findOne({ _id: contactId }); // метод 1
    const result = await Contact.findById(contactId); // метод 2
    if (!result) throw HttpError(404, 'Not found'); // функция генерит ошибку, если таковая есть, она улетает в catch
    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
  }
}

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params
//     const result = await getById(contactId);

//     if (!result) throw HttpError(404, 'Not found'); // функция генерит ошибку, если таковая есть, она улетает в catch

//     res.json(result);
//   } catch (error) {
//     next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
//   }
// });

export async function addContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body); // валидация объекта запроса приходящего от backend (model/contact.js)
    if (error) throw HttpError(400, 'missing required name field');

    const result = await Contact.create(req.body); // добавляет контакт в базу данных

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body); // валидация объекта запроса приходящего от backend (model/contact.js)
    if (error) throw HttpError(400, 'missing required name field');

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // метод возвращает старую версию контакта, чтобы возвращал новую добавить param-3: {new: true}, работает для PUT и PATCH

    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const { error } = updateFavoriteSchema.validate(req.body); // валидация объекта запроса приходящего от backend (model/contact.js)
    if (error) throw HttpError(400, 'missing required field Favorite');

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // метод возвращает старую версию контакта, чтобы возвращал новую добавить param-3: {new: true}, работает для PUT и PATCH

    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;
    // const result = await Contact.findByIdAndDelete(contactId); // Method-1
    const result = await Contact.findByIdAndRemove(contactId); // Method-2

    if (!result) throw HttpError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
}

// router.get('/', async (req, res, next) => {
//   try {
//     const result = await listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params
//     const result = await getById(contactId);

//     if (!result) throw HttpError(404, 'Not found'); // функция генерит ошибку, если таковая есть, она улетает в catch

//     res.json(result);
//   } catch (error) {
//     next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
// const { error } = addSchema.validate(req.body); // проверяет объект запроса

// if (error) throw HttpError(400, 'missing required name field');

//     const result = await addContact(req.body); // передаваемый объект от frontend находится в req.body
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);

//     if (!result) throw HttpError(404, 'Not found');

//     res.json({ message: 'contact deleted' });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);

//     if (error) throw HttpError(400, 'missing fields');

//     const { contactId } = req.params;
//     const result = await updateContact(contactId, req.body);

//     if (!result) throw HttpError(404, 'Not found');

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
