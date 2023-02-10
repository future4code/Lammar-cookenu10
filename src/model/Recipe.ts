export class Recipe{
    constructor(
        private id:string,
        private author_id:string,
        private title:string,
        private description:string
    ){}
}

export interface CreateRecipeDTO {
    title: string,
    description: string
}