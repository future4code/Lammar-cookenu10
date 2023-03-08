import { RecipeRepository } from "../business/RecipeRepository"
import { CustomError } from "../error/CustomError"
import { Recipe, RecipeInputDTO } from "../model/Recipe"
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


    async editRecipe(recipeId: string, recipeData: RecipeInputDTO): Promise<void> {
        try {
            await RecipeData.connection.raw(`
                UPDATE ${RecipeData.tableName}
                SET title = "${recipeData.title}", description = "${recipeData.description}"
                WHERE id = "${recipeId}";
            `)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }


    async deleteRecipe(recipeId: string): Promise<void> {
        try {
            await RecipeData.connection.raw(`
                DELETE FROM ${RecipeData.tableName}
                WHERE id = "${recipeId}";
            `)
        } catch (error: any) {
            throw new CustomError(400, error.message)
        }
    }
}