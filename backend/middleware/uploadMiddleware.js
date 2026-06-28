import multer from "multer";

/* =========================================
   MULTER STORAGE
========================================= */

const storage = multer.memoryStorage();

/* =========================================
   FILE FILTER
========================================= */

const fileFilter = (req, file, cb) => {

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, WEBP images and PDF files are allowed"
      ),
      false
    );
  }
};

/* =========================================
   MULTER CONFIGURATION
========================================= */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export default upload;