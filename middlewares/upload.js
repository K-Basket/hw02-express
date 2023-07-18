import multer from 'multer';
import path from 'path';

// путь к временной папке temp
const tempDir = path.resolve('tmp');

// объект настроек
const multerConfig = multer.diskStorage({
  destination: tempDir, // путь к временной папке
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }, // сохранение файла под другим имененм // file - это файл который находится в опретаивке перед сохранением
});

// middleware
export const upload = multer({
  storage: multerConfig, // настройки multer
});
