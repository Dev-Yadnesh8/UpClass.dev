import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        index : true,
        minLength : [3,"Username must be greater than 3 characters"],
        maxLength : [20,"Username cannot exceed 20 characters"]
    },
    email:  {
        type : String,
        required : true,
        lowercase : true,
        unique: true,
    },
    password:  {
        type : String,
        required : true,
        minLength : [6,"Password must be greater than 6 characters"]
    },
    purchases:[  {
        type : Schema.Types.ObjectId,
        ref : 'Course'
    }],
    watchHistory:  [{
        type : Schema.Types.ObjectId,
        ref : 'Video'
    }],
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER"
    },
     refreshToken : {
        type : String,
        required : true
    }

},{timestamps :true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
   return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function () {
   return jwt.sign({_id : this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({_id : this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
}

export const User = mongoose.model('User',userSchema);