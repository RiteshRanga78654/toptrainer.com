import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
    
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  phone: {
    type: String,
    trim: true,
  },

  whatsapp: {
    type: String,
    trim: true,
  },

location: {
    city: {
        type: String,
        default: "",
    },
    state: {
        type: String,   
        default: "",        
    },
    country: {
        type: String,
        default: "",
    }
},
}, {_id: false})

const onlinePresenceSchema = new mongoose.Schema({
    linkedin: {
    type: String,
    default: "",
  },

  website: {
    type: String,
    default: "",
  },

  instagram: {
    type: String,
    default: "",
  },

  facebook: {
    type: String,
    default: "",
  },

  youtube: {
    type: String,
    default: "",
  },

},{_id: false})
    
const Expertise_DomainSchema = new mongoose.Schema({
industry: {
    type: [String],       
    default: [],
},
domain: {
    type: [String],
    default: [],    
},
competencies: {
    type: [String],     
    default: [],                 
},
TrainerType: {
    type: String,
    default: "",        
},
}, {_id: false})

const profileSummary_Document = new mongoose.Schema({
    profileSummary: {
        type: String,
        default: "",
    },

    profilepdf:{
        type: String,
        default: "",            
    },

    uploadCertificates : [{
        type: String,       
    }],

    galleryImages: [{
        type: String,           
    }],
}, {_id: false})

const awardSchema = new mongoose.Schema({

  title: String,

  organisation: String,

  year: String,

  category: String,

  description: String,

}, { _id: false });


const educationSchema = new mongoose.Schema({

  highestQualification: String,

  institution: String,

  completionYear: String,

}, { _id: false });

const certificationSchema = new mongoose.Schema({

  name: String,

  organisation: String,

  year: String,

  file: String,

}, { _id: false });

const workshopSchema = new mongoose.Schema({

  companyName: String,

  title: String,

  duration: String,

  location: String,

  industry: String,

  domain: String,

  competency: String,

  totalParticipants: Number,

  summary: String,

  photos: [String]

}, { _id: false });


const additionalDetailsSchema = new mongoose.Schema({

  openToTravel: {
    type: Boolean,
    default: false
  },

  languagesFluent: [{
    type: String
  }],

  trainerCertifications: [{
    type: String
  }],

  trainingExperience: String,

  audienceLevel: [{
    type: String
  }],

  feesPerDay: String

}, { _id: false });

const trainerProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

    password: {
  type: String,
  required: true,
  minlength: 8,
  match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    "Password must contain uppercase, lowercase, number and special character"
  ]
},

    profilePhoto: {
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq2r/image/upload/v1690911871/fitnessApp/profilePhoto/defaultProfilePhoto.png",
    },

    bannerPhoto: {
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq2r/image/upload/v1690911871/fitnessApp/profilePhoto/defaultProfilePhoto.png",
    },

    fullName: {
        type: String,
        default: "",
        trim: true,
    },
    companyName: {
        type: String,
        default: "",
        trim: true,
    },
    subjectLine: {
        type: String,
        default: "",
        trim: true,     
    },
    tagsLine: {
        type: [String],
        default: [],
    },

    entityType: {
        type: String,
        options: ["Individual", "Company"],
        default: "Individual",              

    },

contactInfo: contactInfoSchema,

onlinePresence: onlinePresenceSchema,

expertiseDomain: Expertise_DomainSchema,
profileSummary: profileSummary_Document,    
awards: [awardSchema],
education: [educationSchema],
certifications: [certificationSchema],
workshops: [workshopSchema],
additionalDetails: additionalDetailsSchema,



  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "inactive"],
    default: "pending",
  },

  rejectionReason: {
    type: String,
    default: "",
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },
},
{
    timestamps: true,
});

trainerProfileSchema.pre("save", async function(next) {
    if(!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
    next(); 
});


trainerProfileSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

trainerProfileSchema.index({
  fullName: "text",
  profileSummary: "text",
});

const TrainerProfile = mongoose.model(
  "TrainerProfile",
  trainerProfileSchema
);

export default TrainerProfile;