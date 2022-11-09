import express from 'express';
import {
  createRoome,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
  updateRooms,
} from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:hotelid', verifyAdmin, createRoome);

//UPDATE
router.put('/availability/:id', updateRoomAvailability);
router.put('/:id', verifyAdmin, updateRooms);
//DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
//GET

router.get('/:id', getRoom);
//GET ALL

router.get('/', getRooms);

export default router;
