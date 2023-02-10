export class User {
    constructor(
        private id: string,
        private name: string,
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

export interface createUserDTO {
    name: string,
    email: string,
    password: string
}

export interface AuthenticationData {
    id: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}