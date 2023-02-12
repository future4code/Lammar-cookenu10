import { CustomError } from "./CustomError"

export class NameNotProvided extends CustomError {
    constructor() {
        super(400, "Provide user name.")
    }
}

export class EmailNotProvided extends CustomError {
    constructor() {
        super(400, "Provide email.")
    }
}

export class PasswordNotProvided extends CustomError {
    constructor() {
        super(400, "Provide password.")
    }
}

export class IdNotProvided extends CustomError {
    constructor() {
        super(400, "Provide user ID.")
    }
}

export class PasswordTooShort extends CustomError {
    constructor() {
        super(400, "Passwords must have a minimum of 6 characters.")
    }
}

export class InvalidPassword extends CustomError {
    constructor() {
        super(401, "Invalid password.")
    }
}

export class InvalidEmail extends CustomError {
    constructor() {
        super(400, "Invalid email.")
    }
}

export class Unauthorized extends CustomError {
    constructor() {
        super(401, "User not authorized.")
    }
}

export class UserNotFound extends CustomError {
    constructor() {
        super(404, "User not found.")
    }
}

export class TokenNotProvided extends CustomError {
    constructor() {
        super(401, "Token not provided.")
    }
}

export class UserAlreadyFollowing extends CustomError {
    constructor() {
        super(404, "You are already following this user.")
    }
}

export class NotFollowingUser extends CustomError {
    constructor() {
        super(404, "You are not following this user.")
    }
}