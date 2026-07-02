import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const uploadFileTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "application/pdf",];
  if(uploadFileTypes.includes(file.mimetype)){
    cb(null, true);
  } else {
    cb(
      new Error(
  "Only JPG, PNG, WEBP images and PDF files are allowed"
      ),
      false,
    )
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  }
});

export default upload;