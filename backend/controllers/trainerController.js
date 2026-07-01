import TrainerProfile from '../models/trainerProfile.js';
import generateToken from '../utils/generationToken.js';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../middleware/asyncMiddlewire.js';

export const registerTrainer = asyncHandler(
  async (req, res) => {

    const { email, password, confirmPassword, fullName } = req.body;
    if (!email || !password || !confirmPassword || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "passwordm do not match",
      });
    }

    const existingTrainer = await TrainerProfile.findOne({ email });
    if (existingTrainer) {
      return res.status(400).json({
        success: false,
        message: "Trainer already exists eith this email",
      });
    }

    let profilePhoto = {};
    let bannerPhoto = {};

    if (req.files?.profilePhoto) {

      const result = await cloudinary.uploader.upload(
        req.files.profilePhoto[0].path,
        {
          folder: "toptrainer/trainers/profile",
        }
      );

      profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    if (req.files?.bannerPhoto) {

      const result = await cloudinary.uploader.upload(
        req.files.bannerPhoto[0].path,
        {
          folder: "toptrainer/trainers/banner",
        }
      );

      bannerPhoto = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }


    const trainer =
      await TrainerProfile.create({
        ...req.body,
        profilePhoto,
        bannerPhoto,
      });

    trainer.password = undefined;

    res.status(201).json({
      success: true,
      message:
        "Trainer profile submitted successfully.",
      trainer,
    });
  }
)

export const loginTrainer = asyncHandler(
  async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }


    const trainer = await TrainerProfile
      .findOne({ email })
      .select("+password");

    if (!trainer) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    const isMatched =
      await trainer.comparePassword(password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }



    const token = generateToken(
      res,
      trainer._id,
      "trainerToken"
    );

    trainer.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      trainer,
    });

  }
);


export const logoutTrainer = asyncHandler(
  async (req, res) => {

    res.cookie("trainerToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  }
);

export const getMyProfile = asyncHandler(
  async (req, res) => {

    const trainer = await TrainerProfile.findById(
      req.trainer._id
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  }
);


export const updateMyProfile = asyncHandler(

  async (req, res) => {

    const trainer =
      await TrainerProfile.findById(
        req.trainer._id,
      );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "trainer not found",
      })
    }

    if (req.files?.profilePhoto) {
      if (trainer.profilePhoto?.publicId) {
        await cloudinary.uploader.destroy(
          trainer.profilePhoto.publicId
        );
      }
    }

    const profileResult = await cloudinary.uploader.upload(
      req.files.profilePhoto[0].path,
      {
        folder: "toptrainer/trainer/profile",
      }
    );

    req.body.profilePhoto = {
      url: profileResult.secure_url,
      publicId: profileResult.public_id,
    }
    if (req.files?.bannerPhoto) {
      if (trainer.bannerPhoto?.publicId) {
        await cloudinary.uploader.destroy(
          trainer.bannerPhoto.publicId
        );
      }
    }

    const bannerResult = await cloudinary.uploader.upload(
      req.files.bannerPhoto[0].path,
      {
        folder: "toptrainer/trainers/banner",
      }
    );

    req.body.bannerPhoto = {
      url: bannerResult.secure_url,
      publicId: bannerResult.public_id,
    };


    if (req.files?.profiilePdf) {
      if (trainer.profileSmmary?.profilepdf?.publicId) {
        await cloudinary.uploader.destroy(
          trainer.profileSummary.profilepdf.publicId,
          {
            resource_type: "raw",
          }
        );
      }
      const profilePdfResult = await cloudinary.uploader.upload(
        req.files.profilepdf[0].path,
        {
          folder: "toptrainer/trainers/profilepdf",
          type: "raw",
        }
      )

      req.body.profileSummary = {
        ...req.body.profileSummary,
        profilepdf: {
          url: profilePdfResult.secure_url,
          publicId: profilePdfResult.public_id,
        },
      };
    }

    
    if (req.files?.galleryImages) {
      const galleryImages = [];
      if (trainer.profileSummary?.galleryImages?.length) {
        for (const image of trainer.profileSummary.galleryImages) {
          if (image.publicId) {
            await cloudinary.uploader.destroy(image.publicId);
          }
        }
      }
      for (const file of req.files.galleryImages) {
        const galleryImagesResult = await cloudinary.uploader.upload(
          file.path,
          {
            folder: "toptrainer/trainers/gallery",
          }
        );

        galleryImages.push(
          {
            url: galleryImagesResult.secure_url,
            publicId: galleryImagesResult.public_id,
          });
      }
      req.body.profileSummary = {
        ...req.body.profileSummary,
        galleryImages,
      };
    }

    if (req.files?.uploadCertificates) {
      const uploadCertificates = [];
      if (trainer.profileSummary?.uploadCertificates?.length) {
        for (const certificate of trainer.profileSummary.uploadCertificates) {
          if (certificate.publicId) {
            await cloudinary.uploader.destroy(
              certificate.publicId,
              {
                resource_type: "raw",
              });
          }
        }
      }
      for (const file of req.files.uploadCertificates) {
        const uploadCertificateResult = await cloudinary.uploader.upload(
          file.path,
          {
            folder: "toptrainer/trainers/certificates",
            resource_type: "raw",
          });
        uploadCertificates.push(
          {
            url: uploadCertificateResult.secure_url,
            publicId: uploadCertificateResult.public_id,

          }
        );
      }
      req.body.profileSummary = {
        ...req.body.profileSummary,
        uploadCertificates,
      };
    }

    if (req.files?.certificationFiles) {
      const certifications = [
        ...trainer.certifications
      ];
      for (let i = 0; i < req.files.certificationFiles.length; i++) {
        const certificationResult = await cloudinary.uploader.upload(
          req.files.certificationFiles[i].path,
          {
            folder: "toptrainer/trainers/certifications",
            resource_type: "raw",
          });
        if (certifications[i]) {
          certifications[i].file = certificationResult.secure_url;
        }
      }
      req.body.certifications = certifications;
    }

    if (req.files?.workshopPhotos) {
      const photos = [];
      for (const file of req.files.workshopPhotos) {
        const workshopResult = await cloudinary.uploader.upload(file.path,
          {
            folder: "toptrainer/trainers/workshops",
          });
        photos.push(workshopResult.secure_url);
      }
      if (req.body.workshops?.length) {
        req.body.workshops[0].photos = photos;
      }
    }

  const updatedTrainer  =
      await TrainerProfile.findByIdAndUpdate(
        req.trainer._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      trainer: updatedTrainer,
    });

  }
);

export const getAllTrainer = asyncHandler(
  async (req,res) => {
    const page = Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const query={};

    if(req.query.industry){
      query["expertiseDomain.industry"] = req.query.industry;
    }
if(req.query.competency){
  query["expertiseDomain.cpmpetenc"] =req.query.competency;
}

if(req.query.city){
  query["contactInfo.location.city"] = req.query.city;
}

if(req.query.featured){
  query.isFeatured = true;
}

const trainers = await TrainerProfile.find(query)
.skip(skip)
.limit(limit)
.sort({
  createdAt: -1,
});

const total =await TrainerProfile.countDocument(query);

res.status(200).json({
  success: true,
  total,
  page,
  pages: Math.ceil(total/limit),
  trainers,
});
  }
)

export const getTrainerById = asyncHandler(
  async(req, res) => {
    const trainer = await TrainerProfile.findById(
      req.params.id
    );
    if(!trainer){
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    })
  })

