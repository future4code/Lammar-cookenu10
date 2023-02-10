import { CustomError } from "../error/CustomError"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { CreateRecipeDTO, Recipe } from "../model/Recipe"
import { RecipeRepository } from "./RecipeRepository"

const authenticator = new Authenticator()

export class RecipeBusiness {
    constructor(private recipeData: RecipeRepository) { }

    async createRecipe(recipe: CreateRecipeDTO, token:string){
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
}