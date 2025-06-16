import mongoose , {Schema} from "mongoose";

const videoSchema = new Schema({
    title : {
        type: String,
        require : true,
        index:true,
    },
    publicId : {
        type:String,
    },
    courseId : {
        type: Schema.Types.ObjectId,
        ref : 'Course',
    },
    videoFile : {
        type: String,
    },
    duration : {
        type: Number,
        require : true,
    },
    isWatched :[ {
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments :[ {
        type: Schema.Types.ObjectId,
        ref : 'Comment',
        default :[]
    }]
},{timestamps :true});

export const Video = mongoose.model('Video',videoSchema);