import express from 'express'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { RecipeController } from '../controller/RecipeController'
import { RecipeData } from '../data/RecipeData'

export const recipeRouter = express.Router()

const recipeData = new RecipeData()
const recipeBusiness = new RecipeBusiness(recipeData)
const recipeController = new RecipeController(recipeBusiness)

recipeRouter.post("/", (req, res) => recipeController.createRecipe(req, res))
recipeRouter.get("/:id", (req, res) => recipeController.getRecipe(req, res))