import { Router } from "express";
import { uptadeRole, uploadFiles, getUsers, deleteUsers, deleteUser,passwordLink} from "../controllers/users.controller.js";
import uploader from "../utils/uploader.js";
import passport from "passport";
import { handlePolicies } from '../middlewares/middlewares.js'
const router= Router();
router.get('/', getUsers);
router.get('/password-link', passwordLink);
router.delete('/',handlePolicies('admin'), deleteUsers);
router.delete('/:id',deleteUser);
router.post('/:uid/document', passport.authenticate('jwt', {session:false}),uploader.fields([{ name: 'profile_image'}, { name: 'product_image'}, {name: 'document'}]),uploadFiles);
router.put('/premium/:uid', uptadeRole);
export default router;