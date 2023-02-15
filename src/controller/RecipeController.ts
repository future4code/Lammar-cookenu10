import { Request, Response } from 'express'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { RecipeInputDTO } from '../model/Recipe'

export class RecipeController {
    constructor(private recipeBusiness: RecipeBusiness) { }

    async createRecipe(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string
            const { title, description } = req.body

            const newRecipe: RecipeInputDTO = {
                title,
                description
            }

            await this.recipeBusiness.createRecipe(newRecipe, token)

            res.status(201).send({ message: "New recipe added." })
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    async getRecipe(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string
            const { id } = req.params

            const recipe = await this.recipeBusiness.getRecipe(id, token)

            res.status(200).send({ recipe })
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async editRecipe(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string

            const { title, description } = req.body
            const { recipeId } = req.params

            const recipeData: RecipeInputDTO = { title, description }

            await this.recipeBusiness.editRecipe(recipeId, recipeData, token)

            res.status(200).send({ message: "Recipe updated." })
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}