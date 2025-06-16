import mongoose , {Schema} from "mongoose";

const progressSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    courseId : {
        type: Schema.Types.ObjectId,
        ref : 'Course',
        required: true
    },
    completedVideos : {
        type: Number,
        required: true,
        default: 0,
    },
    percentageCompleted : {
        type : Number,
        min : 0,
        max : 100,
        required: true
    },
},{timestamps :true});

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });


export const Progress = mongoose.model('Progress',progressSchema);