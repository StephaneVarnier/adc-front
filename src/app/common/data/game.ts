export class Game {

  constructor(
        public id : number,
        public playerWhite : string,
        public playerBlack : string,
        public eloWhite : string,
        public eloBlack : string,
        public date : string,
        public timeControl : string,
        public resultat : string,
        public opening : string,
        public pgn : string
    ) {}
  }

