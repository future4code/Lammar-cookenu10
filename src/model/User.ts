export class User {
    constructor(
        private id: string,
        private name: string,
        private role: string,
        private email: string,
        private password: string
    ) { }

    getId(){
        return this.id
    }

    getPassword(){
        return this.password
    }
}

export interface CreateUserDTO {
    name: string,
    role: string,
    email: string,
    password: string
}

export interface UserOutputDTO {
    id: string,
    name: string,
    role: string,
    email: string
}

export interface AuthenticationData {
    id: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}