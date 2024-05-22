import mongoose, { SchemaTypes } from "mongoose";

const trainingSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    trener: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    date: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    price: {
        type: SchemaTypes.Decimal128,
        get: (value) => parseFloat(value.toString()),
        set: (value) => value,
    },
})

const Training = mongoose.models.trainings || mongoose.model("trainings", trainingSchema);

export default Training;