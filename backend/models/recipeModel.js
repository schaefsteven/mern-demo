import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
