import Workshop from "../models/workshops.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import cloudinary from "../config/cloudinary.js";
<<<<<<< HEAD

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
=======
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7

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

export const createWorkshop = asyncHandler(async (req, res) => {
  const creatorId = req.admin?._id || req.trainer?._id;

<<<<<<< HEAD
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
=======
  const creatorType = req.admin ? "Admin" : "TrainerProfile";
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7

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
      },
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
      },
    );
    basicInformation.thumbnail = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

<<<<<<< HEAD
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
=======
  if (req.files?.snapshots) {
    const snapshots = [];
    for (const file of req.files.snapshots) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "toptrainer/workshops/gallery",
      });
      snapshots.push({
        url: result.secure_url,
        publicId: result.public_id,
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
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

<<<<<<< HEAD
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
=======
  res.status(201).json({
    success: true,
    message:
      workshop.status === "draft"
        ? "Workshop saved as draft"
        : "Workshop published successfully",
    workshop,
  });
});

export const getDraftWorkshops = asyncHandler(async (req, res) => {
  const creatorId = req.admin?._id || req.trainer?._id;

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

export const getPublishedWorkshops = asyncHandler(async (req, res) => {
  const creatorId = req.admin?._id || req.trainer?._id;

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

export const getSingleWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findById(req.params.id)
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
  const workshop = await Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(404).json({
        success: false,
        message: "Workshop not found",
      });
    }

    workshop.status = "published";

    await workshop.save();
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7

  res.status(200).json({
    success: true,
    message: "Workshop published successfully",
    workshop,
  });
<<<<<<< HEAD

});

export const updateWorkshop = asyncHandler(async (req, res) => {

  const existingWorkshop = await Workshop.findById(req.params.id);

=======
});

export const updateWorkshop = asyncHandler(async (req, res) => {
  const existingWorkshop = await Workshop.findById(req.params.id);

>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
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

<<<<<<< HEAD

  if (req.files?.coverImage) {
    if (existingWorkshop.basicInformation?.coverImage?.publicId) {
      await cloudinary.uploader.destroy(
        existingWorkshop.basicInformation.coverImage.publicId
=======
  if (req.files?.coverImage) {
    if (existingWorkshop.basicInformation?.coverImage?.publicId) {
      await cloudinary.uploader.destroy(
        existingWorkshop.basicInformation.coverImage.publicId,
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
      );
    }
    const result = await cloudinary.uploader.upload(
      req.files.coverImage[0].path,
      {
        folder: "toptrainer/workshops/cover",
<<<<<<< HEAD
      }
=======
      },
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
    );
    basicInformation.coverImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  if (req.files?.thumbnail) {
    if (existingWorkshop.basicInformation?.thumbnail?.publicId) {
      await cloudinary.uploader.destroy(
<<<<<<< HEAD
        existingWorkshop.basicInformation.thumbnail.publicId
=======
        existingWorkshop.basicInformation.thumbnail.publicId,
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
      );
    }
    const result = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      {
        folder: "toptrainer/workshops/thumbnail",
<<<<<<< HEAD
      }
=======
      },
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
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
<<<<<<< HEAD

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
=======
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7

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

  const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Workshop updated successfully",
    workshop,
  });
});

export const deleteWorkshop = asyncHandler(async (req, res) => {
<<<<<<< HEAD

  const workshop = await Workshop.findById(
    req.params.id
  );

  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
=======
  const workshop = await Workshop.findById(req.params.id);

  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "Workshop not found",
    });
  }

  if (workshop.basicInformation?.coverImage?.publicId) {
    await cloudinary.uploader.destroy(
      workshop.basicInformation.coverImage.publicId,
    );
  }

  if (workshop.basicInformation?.thumbnail?.publicId) {
    await cloudinary.uploader.destroy(
      workshop.basicInformation.thumbnail.publicId,
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

// controllers for ADMIN PANEL



// to mark a workshop as a featured workshop

export const isToggle = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);

  // incase workshop isnt found
  if (!workshop) {
    return res.status(404).json({
      success: false,
      message: "workshop not found",
    });
  }

  //max limit of 8
  if (!workshop.isFeatured) {

    const featureCount = await Workshop.countDocuments({
      isFeatured: true,
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
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

    if (featureCount >= 8) {
      return res.status(404).json({
        success: false,
        message:
          "Maximum limit of 8 workshops reached. Please delete a workshop before adding more",
      });
    }
  }

<<<<<<< HEAD
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
=======
  workshop.isFeatured = !workshop.isFeatured;

  // save it back to database
  await workshop.save();

  // at the end return data
  return res.status(200).json({
    success: true,
    message: workshop.isFeatured ? "Workshop Added" : "Workshop Removed",
    data: workshop
  });
  
});

// fetches all the featured workshops only
export const getFeaturedWorkshops = asyncHandler(async (req, res) => {
  const featuredWorkshops = await Workshop.find({
    isFeatured: true,
    status: "published", // Only show published workshops on homepage
    visibility: true, // Only show visible ones
  })
    .populate("assignedTrainer", "fullName profilePhoto") 
    .sort({ updatedAt: -1 }); // Newest changes first

  res.status(200).json({
    success: true,
    count: featuredWorkshops.length,
    data: featuredWorkshops,
  });
});
>>>>>>> c7e88fc1355087f72e8b3972b238ad4ac743d6b7
