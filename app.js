const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); // импортируем роуты работы с маршрутами

const app = express(); // app - создан web-сервер

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors()); // передаем middleware функцию cors, после чего блокировка сервером не производится.
app.use(express.json()); // парсер JSON, интерпретирует значение req.body в формат json
app.use("/api/contacts", contactsRouter); // когда прийдет запрос, который начинается с "/api/contacts" ищи его обработчик в contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
}); // функция обработки ошибок

module.exports = app; // экспортируем web-server для запуска в файле server.js
