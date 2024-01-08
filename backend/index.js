import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Recipe } from './models/recipeModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to your MERN Demo!');
});

// Route to save new recipie
app.post('/recipes', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.description ||
            !req.body.rating
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, description, reating',
            });
        }
        const newRecipe = {
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating
        };
        const recipe = await Recipe.create(newRecipe);
        return res.status(201).send(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
