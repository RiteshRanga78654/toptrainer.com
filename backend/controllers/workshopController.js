import Workshop from "../models/workshops.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import cloudinary from "../config/cloudinary.js";

// basicInformation / mediaGallery aate hain form-data me JSON string ki tarah,
// isliye safely parse karte hain (agar already object hai to waisa hi return hoga)
const parseIfString = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      return {};
    }
  }
  return value || {};
};

export const createWorkshop = asyncHandler(
  async (req, res) => {

    const creatorId = req.admin?._id || req.trainer?._id;

    const creatorType = req.admin
      ? "Admin"
      : "TrainerProfile";

    const basicInformation = parseIfString(req.body.basicInformation);
    const mediaGallery = parseIfString(req.body.mediaGallery);
    const schedule = parseIfString(req.body.schedule);
    const pricing = parseIfString(req.body.pricing);
    const learningDetails = parseIfString(req.body.learningDetails);
    const classification = parseIfString(req.body.classification);
    const conductedMode = parseIfString(req.body.conductedMode);
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(
        req.files.coverImage[0].path,
        {
          folder: "toptrainer/workshops/cover",
        }
      );
      basicInformation.coverImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    if (req.files?.thumbnail) {
      const result = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        {
          folder: "toptrainer/workshops/thumbnail",
        }
      );
      basicInformation.thumbnail = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    if (req.files?.snapshots) {
      const snapshots = [];
      for (const file of req.files.snapshots) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "toptrainer/workshops/gallery",
        });
        snapshots.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
      mediaGallery.snapshots = snapshots;
    }

    const workshop = await Workshop.create({
      ...req.body,
      basicInformation,
      schedule,
      pricing,
      learningDetails,
      classification,
      conductedMode,
      mediaGallery,
      createdBy: creatorId,
      creatorType,
    });

    res.status(201).json({
      success: true,
      message:
        workshop.status === "draft"
          ? "Workshop saved as draft"
          : "Workshop published successfully",
      workshop,
    });


  });

export const getDraftWorkshops = asyncHandler(
  async (req, res) => {
    const creatorId =
      req.admin?._id || req.trainer?._id;

    const drafts = await Workshop.find({
      createdBy: creatorId,
      status: "draft",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drafts.length,
      drafts,
    });

  });

export const getPublishedWorkshops = asyncHandler(
  async (req, res) => {
    const creatorId =
      req.admin?._id || req.trainer?._id;

    const workshops = await Workshop.find({
      createdBy: creatorId,
      status: "published",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workshops.length,
      workshops,
    });

  });

export const getSingleWorkshop = asyncHandler(
  async (req, res) => {

    const workshop = await Workshop.findById(
      req.params.id
    )
      .populate("createdBy")
      .populate("assignedTrainer");

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    res.status(200).json({
      success: true,
      workshop,
    });


  });

export const publishWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findById(
    req.params.id
  );

  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  workshop.status = "published";

  await workshop.save();

  res.status(200).json({
    success: true,
    message: "Workshop published successfully",
    workshop,
  });

});

export const updateWorkshop = asyncHandler(async (req, res) => {

  const existingWorkshop = await Workshop.findById(req.params.id);

  if (!existingWorkshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  const basicInformation = parseIfString(req.body.basicInformation);
  const mediaGallery = parseIfString(req.body.mediaGallery);
  const schedule = parseIfString(req.body.schedule);
  const pricing = parseIfString(req.body.pricing);
  const learningDetails = parseIfString(req.body.learningDetails);
  const classification = parseIfString(req.body.classification);
  const conductedMode = parseIfString(req.body.conductedMode);


  if (req.files?.coverImage) {
    if (existingWorkshop.basicInformation?.coverImage?.publicId) {
      await cloudinary.uploader.destroy(
        existingWorkshop.basicInformation.coverImage.publicId
      );
    }
    const result = await cloudinary.uploader.upload(
      req.files.coverImage[0].path,
      {
        folder: "toptrainer/workshops/cover",
      }
    );
    basicInformation.coverImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  if (req.files?.thumbnail) {
    if (existingWorkshop.basicInformation?.thumbnail?.publicId) {
      await cloudinary.uploader.destroy(
        existingWorkshop.basicInformation.thumbnail.publicId
      );
    }
    const result = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      {
        folder: "toptrainer/workshops/thumbnail",
      }
    );
    basicInformation.thumbnail = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  if (req.files?.snapshots) {
    if (existingWorkshop.mediaGallery?.snapshots?.length) {
      for (const snapshot of existingWorkshop.mediaGallery.snapshots) {
        if (snapshot.publicId) {
          await cloudinary.uploader.destroy(snapshot.publicId);
        }
      }
    }
    const snapshots = [];
    for (const file of req.files.snapshots) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "toptrainer/workshops/gallery",
      });
      snapshots.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }
    mediaGallery.snapshots = snapshots;
  }

  if (Object.keys(basicInformation).length) {
    req.body.basicInformation = {
      ...existingWorkshop.basicInformation.toObject(),
      ...basicInformation,
    };
  }

  if (Object.keys(mediaGallery).length) {
    req.body.mediaGallery = {
      ...existingWorkshop.mediaGallery?.toObject(),
      ...mediaGallery,
    };
  }
  if (Object.keys(schedule).length) {
  req.body.schedule = {
    ...existingWorkshop.schedule?.toObject(),
    ...schedule,
  };
}

if (Object.keys(pricing).length) {
  req.body.pricing = {
    ...existingWorkshop.pricing?.toObject(),
    ...pricing,
  };
}

if (Object.keys(learningDetails).length) {
  req.body.learningDetails = {
    ...existingWorkshop.learningDetails?.toObject(),
    ...learningDetails,
  };
}

if (Object.keys(classification).length) {
  req.body.classification = {
    ...existingWorkshop.classification?.toObject(),
    ...classification,
  };
}

if (Object.keys(conductedMode).length) {
  req.body.conductedMode = {
    ...existingWorkshop.conductedMode?.toObject(),
    ...conductedMode,
  };
}

  const workshop =
    await Workshop.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

  res.status(200).json({
    success: true,
    message: "Workshop updated successfully",
    workshop,
  });


});

export const deleteWorkshop = asyncHandler(async (req, res) => {

  const workshop = await Workshop.findById(
    req.params.id
  );

  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  if (workshop.basicInformation?.coverImage?.publicId) {
    await cloudinary.uploader.destroy(
      workshop.basicInformation.coverImage.publicId
    );
  }

  if (workshop.basicInformation?.thumbnail?.publicId) {
    await cloudinary.uploader.destroy(
      workshop.basicInformation.thumbnail.publicId
    );
  }

  if (workshop.mediaGallery?.snapshots?.length) {
    for (const snapshot of workshop.mediaGallery.snapshots) {
      if (snapshot.publicId) {
        await cloudinary.uploader.destroy(snapshot.publicId);
      }
    }
  }

  await workshop.deleteOne();

  res.status(200).json({
    success: true,
    message: "Workshop deleted successfully",
  });


});

export const getAllPublicWorkshops = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = { status: "published", visibility: true };
  if (req.query.category) {
    query["basicInformation.category"] = req.query.category;
  }

  const [workshops, total] = await Promise.all([
    Workshop.find(query)
      .populate({ path: "assignedTrainer", select: "-password" })
      .populate({ path: "createdBy", select: "-password" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Workshop.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: workshops.length,
    total,
    page,
    workshops,
  });
});

export const getPublicSingleWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findOne({
    _id: req.params.id,
    status: "published",
    visibility: true,
  })
    .populate({ path: "createdBy", select: "-password" })
    .populate({ path: "assignedTrainer", select: "-password" })
    .lean();

  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  res.status(200).json({
    success: true,
    workshop,
  });
});