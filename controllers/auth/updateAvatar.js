import { User } from '../../models/user.js';
import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp';

const avatarsDir = path.resolve('public', 'avatars');

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const resizeAvatar = await Jimp.read(tempUpload);
    resizeAvatar.resize(250, Jimp.AUTO).write(tempUpload); // resize файла и запись его по адресу tempUpload

    const filename = `${_id}_${originalname}`; // переименовываем и делаем название уникальным

    const resultUpload = path.resolve(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload); // перемещение файла из tmp в public/avatars

    const avatarURL = path.resolve('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL }); // перезаписываем аватар, сгенерированный ранее.

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
