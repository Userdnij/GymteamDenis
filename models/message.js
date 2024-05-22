import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
    },
    answered: {
        type: Boolean,
        default: false,
    }
})

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;