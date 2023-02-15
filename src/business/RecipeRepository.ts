import { Recipe, RecipeInputDTO } from "../model/Recipe"

export interface RecipeRepository {
    createRecipe(newRecipe: Recipe): Promise<void>
    findRecipe(prop: string, data: string): Promise<any>
    editRecipe(recipeId: string, recipeData: RecipeInputDTO): Promise<void>
    deleteRecipe(recipeId: string): Promise<void>
}