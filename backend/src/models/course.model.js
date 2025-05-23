import mongoose , {Schema} from "mongoose";

const courseSchema = new Schema({
    title : {
        type: String,
        require : true,
        index:true,
    },
    description : {
        type: String,
        require : true,
    },
    thumbnail : {
        type: String,
        require : true,
    },
    price : {
        type: Number,
        require : true,
    },
    videos :[ {
        type: Schema.Types.ObjectId,
        ref : 'Video',
    }],
    purchasedBy :[ {
        type: Schema.Types.ObjectId,
        ref : 'User',
    }],
},{timestamps :true});

export const Course = mongoose.model('Course',courseSchema);