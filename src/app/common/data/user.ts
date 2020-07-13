export class User {

    

    // lastSeenGame : string = "";
    // lastSeenFen : string = "";
    // lastSeenSan : string = "";

    constructor (
        public id : number = Math.random(),
        public username : string = "",
        public password : string = "",
        public email : string = "") {};
}