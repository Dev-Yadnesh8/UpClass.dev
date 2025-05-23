import mongoose , {Schema} from "mongoose";

const videoSchema = new Schema({
    title : {
        type: String,
        require : true,
        index:true,
    },
    videoFile : {
        type: String,
    },
    duration : {
        type: Number,
        require : true,
    },
    isWatched : {
        type: Boolean,
        require : true,
        default : false
    },
    comments :[ {
        type: Schema.Types.ObjectId,
        ref : 'Comment',
    }],
    likes :[ {
        type: Schema.Types.ObjectId,
        ref : 'User',
    }],
    dislikes :[ {
        type: Schema.Types.ObjectId,
        ref : 'User',
    }],
},{timestamps :true});

export const Video = mongoose.model('Video',videoSchema);