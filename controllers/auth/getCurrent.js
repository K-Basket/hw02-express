export const getCurrent = async (req, res, next) => {
  try {
    const { email, name } = req.user;

    res.json({ email, name });
  } catch (error) {
    next(error);
  }
};
