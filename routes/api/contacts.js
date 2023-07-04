const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi"); // для валидации данных

const router = express.Router();

// составляем схему требований к каждому полю объекта, приходящего от frontend
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts(); // получаем весь список контактов
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found"); // функция генерит ошибку, если таковая есть, она улетает в catch
    }

    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body); // проверяет объект запроса
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body); // передаваемый объект от frontend находится в req.body
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    console.log(req.body);
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
