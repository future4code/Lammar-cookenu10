export class Recipe {
    constructor(
        private id: string,
        private author_id: string,
        private title: string,
        private description: string
    ) { }
}

export interface RecipeInputDTO {
    title: string,
    description: string
}

export interface RecipeOutputDTO {
    id: string,
    title: string,
    description: string,
    createdAt: Date
}