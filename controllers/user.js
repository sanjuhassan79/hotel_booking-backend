import User from '../schemasModels/User.js';

export const updateUsers = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Update User Successfully',
      data: updateUsers,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Delete User Successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleUsers = async (req, res, next) => {
  try {
    const Users = await User.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: 'single User Successfully',
      data: Users,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find();

    res.status(200).json({
      success: true,
      message: 'User Successfully',
      data: Users,
    });
  } catch (err) {
    next(err);
  }
};
