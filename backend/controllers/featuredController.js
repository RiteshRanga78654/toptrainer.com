import featuredItems from "../models/featuredItems.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";

export const isToggle = asyncHandler(async (req, res) => {
  const { itemRef, itemType, category } = req.body;

  const isFeatured = await featuredItems.findOne({
    itemRef,
    category,
  });

  if (isFeatured) {
    await featuredItems.findByIdAndDelete(isFeatured);
    return res
      .status(200)
      .json({ success: true, message: "Removed from the featured list" });
  }

  // before adding to db check the count < 8
  const count = await featuredItems.countDocuments({
    itemType,
    category,
  });

  if (itemType==="Workshop" && count >= 8 ) {
    return res
      .status(400)
      .json({
        message:
          "Limit of 8 Workshops reached, Please delete a workshop before adding one",
      });
  }
  if (itemType==="TrainerProfile" && count >= 6 ) {
    return res
      .status(400)
      .json({
        message:
          "Limit of 6 Trainers reached, Please delete a trainer before adding one",
      });
  }
  

  const addedItem = await featuredItems.create({
    itemRef,
    itemType,
    category,
  });

  return res
    .status(200)
    .json({
      success: true,
      message: "item featured successfully",
      data: addedItem,
    });
});

export const getFeaturedList = asyncHandler(async (req, res) => {

    const {itemType, category} = req.query;


    let populateFilter = {}
    let filter = {}
    
    if (itemType==="Workshop"){

        if(!itemType || !category){
          return res.status(400).json({
              success: false,
              message: "both itemType and Category are required to fetch the featured workshop list"
          })
        }

      populateFilter = {
        path:"itemRef",
        match: {status: "published", visibility: true},
        populate: {path: "assignedTrainer", select: "fullName"}
      }
      filter = {
          itemType,
          category
      }

    }

    else if(itemType==="TrainerProfile" && category){
      populateFilter = {
        path:"itemRef",
        match: {status: "approved"}
      }
      filter = {
          itemType,
          category
      }
    }

    else if(itemType==="TrainerProfile"){
      populateFilter = {
        path:"itemRef",
        match: {status: "approved"}
      }
      filter = {
          itemType,
      }
    }

    else{
      return res.status(400).json({
              success: false,
              message: "please enter a valid itemType"
          })
    }



    const featured = await featuredItems.find(filter).populate(populateFilter).sort({createdAt: -1})
    

    const cleanData  = featured.filter(item => item.itemRef != null);

    return res.status(200).json({success: true, count: cleanData.length, data: cleanData})
});
