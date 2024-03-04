import { __dirname } from "./utils.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = "";
    if (file.fieldname === "product_image") {
      destination = `${__dirname}/../public/images/products`;
    } else if (file.fieldname === "profile_image") {
      destination = `${__dirname}/../public/images/profiles`;
    } else {
      destination = `${__dirname}/../public/images/documents`;
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploader = multer({ storage });
export default uploader;
