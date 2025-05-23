import mongoose , {Schema} from "mongoose";

const commentSchema = new Schema({
    comment : {
        type: String,
        require : true,
    },
    commentedBy : {
        type: Schema.Types.ObjectId,
        ref : 'User',
    },
    videoId : {
        type: Schema.Types.ObjectId,
        ref : 'Video',
    },
},{timestamps :true});

export const Comment = mongoose.model('Comment',commentSchema);