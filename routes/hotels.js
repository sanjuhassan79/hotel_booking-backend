import express from 'express';
import {
  countByCity,
  countByType,
  createHotele,
  deleteHotels,
  getAllHotels,
  getHotelsRooms,
  getSingleHotels,
  updateHotels,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotele);
router.put('/findupdate/:id', verifyAdmin, updateHotels);
router.delete('/finddelete/:id', verifyAdmin, deleteHotels);

router.get('/findsingle/:id', getSingleHotels);

router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/room/:id', getHotelsRooms);
export default router;
