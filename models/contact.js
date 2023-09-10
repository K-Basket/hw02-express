// 💙💛  Mongoose модель.
import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import Joi from 'joi';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   match: emailRegexp,
    //   required: true,
    // },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

export const addSchema = Joi.object({
  name: Joi.string().required(),
  // email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});
export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const Contact = model('contact', contactSchema);
