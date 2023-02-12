export class Following {
    constructor(
        private id: string,
        private user_id: string,
        private user_to_follow_id: string
    ) { }
}