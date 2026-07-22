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
    category,
  });

  if (count >= 8) {
    return res
      .status(400)
      .json({
        message:
          "the limit of 8 featured items reached, please delete a item before adding one",
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

    if(!itemType || !category){
        return res.status(400).json({
            success: false,
            message: "both itemType and Category are required to fetch the featured list"
        })
    }

    const featured = await featuredItems.find({
        itemType,
        category
    }).populate({
        path:"itemRef",
        match: {status: "published", visibility: true}
    }).sort({createdAt: -1})

    const cleanData  = featured.filter(item => item.itemRef != null);

    return res.status(200).json({success: true, count: cleanData.length, data: cleanData})
});
