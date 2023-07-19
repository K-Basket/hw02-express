import { Contact } from '../../models/contact.js';

export async function listContacts(req, res, next) {
  try {
    const { _id: owner } = req.user; // вытаскиваем _id одновременно переименовав его в owner из req // добавляет ownera в req в authenticate.js
    const { page = 1, limit = 10, favorite } = req.query; // req.query - все параметры поиска

    let list = { owner, favorite };

    if (favorite === undefined) {
      list = { owner };
    }
    const skip = (page - 1) * limit; // вычисление пагинации
    const result = await Contact.find(list, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'name email');
    // /.find({ owner }, '-createdAt -updatedAt', {skip, limit,}/ - ищет все контакты в MongoDB c учетом собственника контакта; /'-createdAt -updatedAt'/ - и исключаем дату создания и обновления
    // .populate('owner') - означает след-ее, возьми поле 'owner', найди с какой оно коллекции, пойди в ту коллекцию, найди объект с таким id и и вставь в поле owner; второй параметр - это список нужных полей; третий параметр - это пагинация

    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами (см. app.js)
  }
}
