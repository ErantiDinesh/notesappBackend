import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const userModel = mongoose.models.notes || mongoose.model("notes", userSchema);

export default userModel;