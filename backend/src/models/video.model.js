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
    isWatched : {
        type: Boolean,
        require : true,
        default : false
    },
    comments :[ {
        type: Schema.Types.ObjectId,
        ref : 'Comment',
        default :[]
    }],
    likes :[ {
        type: Schema.Types.ObjectId,
        ref : 'User',
        default :[]
    }],
    dislikes :[ {
        type: Schema.Types.ObjectId,
        ref : 'User',
        default :[]
    }],
},{timestamps :true});

export const Video = mongoose.model('Video',videoSchema);