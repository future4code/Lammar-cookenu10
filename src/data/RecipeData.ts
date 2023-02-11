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

    async findRecipe(prop: string, data: string): Promise<any> {
        try {
            const result = await RecipeData.connection(`${RecipeData.tableName}`)
                .select().where(prop, data)

            return result[0]
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    };
}