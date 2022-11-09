import Hotel from '../schemasModels/Hotel.js';
import Room from '../schemasModels/Room.js';

export const createHotele = async (req, res, next) => {
  try {
    const savedHotel = await Hotel.create({
      ...req.body,
    });

    res.status(200).json({
      success: true,
      message: 'Hotel created Successfully',
      data: savedHotel,
    });
  } catch (err) {
    next(err);
  }
};

export const updateHotels = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Update Hotel Successfully',
      data: updateHotel,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteHotels = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Delete Hotel Successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: 'single Hotel Successfully',
      data: hotels,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);

    res.status(200).json({
      success: true,
      message: 'Hotel Successfully',
      data: hotels,
    });
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    // const hotels = await Hotel.find();
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json({
      success: true,
      message: 'Hotel Successfully',
      data: list,
    });
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json({
      success: true,
      message: 'Hotel Successfully',
      data: [
        { type: 'hotel', count: hotelCount },
        { type: 'apartments', count: apartmentCount },
        { type: 'resorts', count: resortCount },
        { type: 'villas', count: villaCount },
        { type: 'cabins', count: cabinCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};

export const getHotelsRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel.rooms);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json({
      success: true,
      message: 'Hotel Successfully',
      data: list,
    });
  } catch (err) {
    next(err);
  }
};
