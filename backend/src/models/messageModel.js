import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    deleteFor: {
        type: [mongoose.Schema.Types.ObjectId], // Defines an array of ObjectIds
        ref: "User",
        default: []  // Ensures it initializes as an empty array
    }
    

},
    {
        timestamps: true
    }

)
const Message = new mongoose.model("Message", messageSchema)
export default Message