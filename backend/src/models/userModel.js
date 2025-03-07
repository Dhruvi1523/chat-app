import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default:  function() {
            const initials = (this.fullName).split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
        }
    }
    
} , 
{timestamps : true}

)
const User = new  mongoose.model("User" , userSchema);

export default User ;