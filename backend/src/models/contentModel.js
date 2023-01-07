const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  name: {
    type: String,  
  }, 
  image: {
     type: String,
     trim: true,
   },
  url: {
    type: String,
    trim: true,
  },
  userId: {type: Schema.Types.ObjectId, ref: "User",default:null},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
