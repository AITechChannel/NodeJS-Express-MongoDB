import { UserReFreshToken } from './logout.model.js';

export const logout = async (req, res) => {
  try {
    const refreshToken = await UserReFreshToken.findOne({
      refresh_token: req.body.refreshToken
    });
    if (!refreshToken)
      return res
        .status(200)
        .json({ error: false, message: 'Logged Out Sucessfully' });

    await refreshToken.remove();
    res.status(200).json({ error: false, message: 'Logged Out Sucessfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
