import mongoose, { SchemaTypes } from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
    },
})

const News = mongoose.models.news || mongoose.model("news", newsSchema);

export default News;