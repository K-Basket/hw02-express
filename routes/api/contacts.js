import express from "express";
import {
  addContact,
  getById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";
import Joi from "joi"; // для валидации данных

export const router = express.Router(); // Создает объект мини-приложения, который передаем в app.js

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); // схема требований к каждому полю объекта, приходящего от frontend

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params
    const result = await getById(contactId);

    if (!result) throw HttpError(404, "Not found"); // функция генерит ошибку, если таковая есть, она улетает в catch

    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body); // проверяет объект запроса

    if (error) throw HttpError(400, "missing required name field");

    const result = await addContact(req.body); // передаваемый объект от frontend находится в req.body
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) throw HttpError(404, "Not found");

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) throw HttpError(400, "missing fields");

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) throw HttpError(404, "Not found");

    res.json(result);
  } catch (error) {
    next(error);
  }
});
