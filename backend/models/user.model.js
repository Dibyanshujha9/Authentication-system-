import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user schema email and password 
const userSchema = new mongoose.Schema({
    email:{
        type : String,
        require:true,
        unique:true,
        trim:true,
        lowercase : true,
        minLength:[6,'Email must be of atleast 6 character'],
        maxLength:[50,'Email must be of no longer than 50 character']
    },
    password:{
        type:String,
        select:false,
    }
})

// hashing of password using bcrypt 
userSchema.statics.hashPassword = async function (password){
return await bcrypt.hash(password,10);
}

// comparison of password
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password , this.password);
}

// jwt token 
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

const User = mongoose.model('user',userSchema);

export default User;
