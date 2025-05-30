import mongoose ,{Schema} from "mongoose";
const purchaseSchama = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    courseId:{
        type : Schema.Types.ObjectId,
        ref: 'Course'
    }
},{timestamps:true});
export const Purchase = mongoose.model('Purchase',purchaseSchama);