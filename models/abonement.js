import mongoose, { SchemaTypes } from "mongoose";

const abonementSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    price: {
        type: SchemaTypes.Decimal128,
        // get: (value) => (value / 100).toFixed(2),
        get: (value) => parseFloat(value.toString()),
        set: (value) => {
            console.log("Value before setter: ", value);
            return value;
        },
    },
    term: {
        type: Number,
    },
    parameters: {
        type: Array,
    },
})

const Abonement = mongoose.models.abonements || mongoose.model("abonements", abonementSchema);

export default Abonement;