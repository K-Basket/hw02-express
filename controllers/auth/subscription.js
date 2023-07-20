import { HttpError } from '../../helpers/HttpError.js';
import { User, subscriptionSchema } from '../../models/user.js';

export const subscription = async (req, res, next) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required field "subscription"');

    const { subscription } = req.body;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};
