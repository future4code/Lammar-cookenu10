import { RecipeRepository } from "../business/RecipeRepository"
import { CustomError } from "../error/CustomError"
import { Recipe } from "../model/Recipe"
import { BaseDB } from "./BaseDB"

export class RecipeData extends BaseDB implements RecipeRepository {
    private static tableName = "cookenu_recipes"

    async createRecipe(newRecipe: Recipe): Promise<void> {
        try {
            await RecipeData.connection(RecipeData.tableName)
                .insert(newRecipe)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}