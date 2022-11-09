import Hotel from '../schemasModels/Hotel.js';
import Room from '../schemasModels/Room.js';

// export const createRoome = async (req, res, next) => {
//   const hotelId = req.params.hotelId;
//   const newRoom = new Room(req.body);
//   try {
//     const savedRoom = await newRoom.save();
//     try {
//       await Hotel.findByIdAndUpdate(hotelId, {
//         $push: { room: savedRoom._id },
//       });
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Room created Successfully',
//       data: savedRoom,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
export const createRoome = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRooms = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Update Room Successfully',
      data: updatedRoom,
    });
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Room status has been updated.',
      data: savedRoom,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      success: true,
      message: 'Room has been deleted.',
    });
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Room has been .',
      data: room,
    });
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success: true,
      message: 'Room has been .',
      data: rooms,
    });
  } catch (err) {
    next(err);
  }
};
