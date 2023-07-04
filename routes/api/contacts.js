const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts(); // получаем весь список контактов
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  console.log("req.params", req.params);

  try {
    const { contactId } = req.params; // забираем из объекта значение contactId
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found"); // функция генерит ошибку
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error; // выбрасывает ошибку
    }
    // if (!result) return res.status(404).json({ message: "Not found" }); // если такого id не, отправить ответ

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({ message });
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
