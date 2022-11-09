import express from 'express';
import {
  deleteUsers,
  getAllUsers,
  getSingleUsers,
  updateUsers,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/hi', verifyToken, (req, res, next) => {
  res.send('hello user');
});
router.put('/:id', verifyUser, updateUsers);
router.delete('/:id', verifyUser, deleteUsers);

router.get('/:id', verifyUser, getSingleUsers);

router.get('/', verifyAdmin, getAllUsers);

export default router;
