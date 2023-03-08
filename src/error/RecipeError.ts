import { CustomError } from "./CustomError"

export class RecipeNotFound extends CustomError {
    constructor() {
        super(404, "Recipe not found.")
    }
}

export class RecipeTitleNotProvided extends CustomError {
    constructor() {
        super(400, "Please inform recipe title.")
    }

}
export class RecipeDescriptionNotProvided extends CustomError {
    constructor() {
        super(400, "Please inform recipe description.")
    }
}

export class RecipeIdNotProvided extends CustomError {
    constructor() {
        super(400, "Please inform recipe ID.")
    }
}

export class RecipeNotOwned extends CustomError {
    constructor() {
        super(400, "Recipe owned by someone else.")
    }
}
