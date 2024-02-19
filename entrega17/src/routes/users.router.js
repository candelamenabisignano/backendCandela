import { Router } from "express";
import { uptadeRole, uploadFiles } from "../controllers/users.controller.js";
import uploader from "../utils/uploader.js";
import passport from "passport";
const router= Router();

router.post('/:uid/document', passport.authenticate('jwt', {session:false}),uploader.fields([{ name: 'profile_image'}, { name: 'product_image'}, {name: 'document'}]),uploadFiles)
router.put('/premium/:uid', uptadeRole);

export default router;