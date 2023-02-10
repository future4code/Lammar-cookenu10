import { Request, Response } from 'express'
import { RecipeBusiness } from '../business/RecipeBusiness'
import { CreateRecipeDTO } from '../model/Recipe'

export class RecipeController {
    constructor(private recipeBusiness: RecipeBusiness) { }

    async createRecipe(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string

            const { title, description } = req.body

            const newRecipe:CreateRecipeDTO = {
                title,
                description
            }

            await this.recipeBusiness.createRecipe(newRecipe, token)

            res.status(201).send({ message: "New recipe added."})
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}