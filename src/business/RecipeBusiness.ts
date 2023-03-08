import { CustomError } from "../error/CustomError"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { RecipeRepository } from "./RecipeRepository"
import { Unauthorized } from "../error/UserError"
import { RecipeInputDTO, Recipe, RecipeOutputDTO } from "../model/Recipe"
import {
    RecipeDescriptionNotProvided, RecipeIdNotProvided, RecipeNotFound,
    RecipeNotOwned, RecipeTitleNotProvided
} from "../error/RecipeError"

const authenticator = new Authenticator()

export class RecipeBusiness {
    constructor(private recipeData: RecipeRepository) { }

    async createRecipe(recipe: RecipeInputDTO, token: string) {
        try {
            const { title, description } = recipe

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generateId()

            const author_id = authenticator.getTokenData(token).id

            const newRecipe = new Recipe(
                id,
                author_id,
                title,
                description
            )

            await this.recipeData.createRecipe(newRecipe)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getRecipe(recipeId: string, token: string): Promise<RecipeOutputDTO> {
        try {
            const payload = authenticator.getTokenData(token)

            if (!payload) {
                throw new Unauthorized
            }

            const foundRecipe = await this.recipeData.findRecipe("id", recipeId)

            if (!foundRecipe) {
                throw new RecipeNotFound
            }

            const recipe: RecipeOutputDTO = {
                id: foundRecipe.id,
                title: foundRecipe.title,
                description: foundRecipe.description,
                createdAt: foundRecipe.creation_date.toLocaleDateString()
            }

            return recipe
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async editRecipe(recipeId: string, recipeData: RecipeInputDTO, token: string): Promise<void> {
        try {
            if (!recipeData.title) {
                throw new RecipeTitleNotProvided
            }
            if (!recipeData.description) {
                throw new RecipeDescriptionNotProvided
            }
            if (!token) {
                throw new Unauthorized
            }

            const { id, role } = authenticator.getTokenData(token)

            const foundRecipe = await this.recipeData.findRecipe("id", recipeId)
            if (!foundRecipe) {
                throw new RecipeNotFound
            }

            if (foundRecipe.author_id !== id && role === 'normal') {
                throw new RecipeNotOwned
            }

            await this.recipeData.editRecipe(recipeId, recipeData)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async deleteRecipe(recipeId: string, token: string): Promise<void> {
        try {
            if (!token) {
                throw new Unauthorized
            }

            const { id, role } = authenticator.getTokenData(token)

            const foundRecipe = await this.recipeData.findRecipe("id", recipeId)
            if (!foundRecipe) {
                throw new RecipeNotFound
            }

            if (foundRecipe.author_id !== id && role === 'normal') {
                throw new RecipeNotOwned
            }

            await this.recipeData.deleteRecipe(recipeId)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}