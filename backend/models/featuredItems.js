import mongoose from "mongoose";

// This schema will be used for any kind of featured item like workshop trainer or article

const featuredItemsSchema = new mongoose.Schema({
    
    itemRef:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'itemType'
    },

    itemType: {
        type: String,
        required: true,
        enum: ["Workshop", "TrainerProfile", "Article"]
    },

    category: {
        type: String,
        required: true
    }

});

const featuredItems = mongoose.model("featuredItems", featuredItemsSchema);

export default featuredItems;

