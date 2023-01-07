import mongoose from 'mongoose';
const { Schema } = mongoose;
// schema 
const contentSchema = new Schema({
  name: {
    type: String,
    trim: true,    
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

const UserContent = mongoose.model("UserContent", contentSchema);
export default UserContent;
