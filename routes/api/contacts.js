const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts(); // получаем весь список контактов
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  console.log("req.params", req.params);

  try {
    const { contactId } = req.params; // забираем из объекта значение contactId
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found"); // функция генерит ошибку, если таковая есть, она улетает в catch
    }

    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами
  }
}); // все динамические части маршрута сохраняются в объекте req.params

router.post("/", async (req, res, next) => {
  res.json({ message: "template message POST" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message DELETE-id" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message PUT-id" });
});

module.exports = router;
