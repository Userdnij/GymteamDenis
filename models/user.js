import mongoose from "mongoose";
import Abonement from "./abonement";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    vards: {
        type: String,
        required: [true, "Please provide vards"],
    },
    uzvards: {
        type: String,
        required: [true, "Please provide uzvards"],
    },
    talrunis: {
        type: String,
        required: [true, "Please provide talrunis"],
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        default: "user",
    },
    abonement: {
        type: mongoose.Schema.Types.ObjectId, ref: 'abonements', required: false
    },
    abonement_payed_until: {
        type: Date,
        required: false,
    },
    is_locked: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;