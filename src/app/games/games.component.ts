import { Component, OnInit } from '@angular/core';
import { Game } from '../common/data/game';
import { GamesService } from '../common/services/games.service';
import { FullMove } from '../common/data/fullMove';
import { FenStat } from '../common/data/fenStat';
import { now } from 'jquery';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { ChampionsService } from '../common/services/champions.service';
import { StatisticsService } from '../common/services/statistics.service';
import { Champion } from '../common/data/champion';
import { SanStat } from '../common/data/SanStat';


declare var ChessBoard: any;

const COLOR_NORMAL = "#f0d9b5"
const COLOR_MOVE = "orange"
const ALL_OPENINGS = "- - -"
const DRAW = "1/2-1/2"
const WHITE_VICTORY = "1-0"
const BLACK_VICTORY = "0-1"
const PROPOSED_MOVES_NUMBER = 3


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {

  selected: boolean;
  myBoard: any;
  
  selectedGame: Game;
  selectedOpening : string;
  gameLabel: string = "";
  gamePGN: string = "";
  gameDate: string = "";;
  gameOpening : string = "";
  gameId: number;
  moveNumber: number;
  orientation: string = "white";
  playedGamesByPosition: number;
  points: number;
  openingEfficiency : number; 
  openingGamesNumber : number; 
  username : string = "";
  currentPlayer : string = ""
  showBack : boolean = false;

  fens = [];
  sans = [];

  openings : Array<String> = new Array<String>();
  games  : Array<Game> = new Array<Game>();
  stats: Array<FenStat> = new Array<FenStat>();
  fullMoves: Array<FullMove> = new Array<FullMove>();
  champions : Array<Champion> = new Array<Champion>();
  sanstats : Array<SanStat> = new Array<SanStat>();
  nextMoves: Array<String> = new Array<String>();

  constructor(public gamesService: GamesService, public championsService : ChampionsService, public statisticsService : StatisticsService ) { }

  onChangeSelectedOpening() {
    
    let open = this.selectedOpening == ALL_OPENINGS ? "" : this.selectedOpening;
    console.log(open)

    this.gamesService.getGamesByOpeningAndUsername(open, this.username)
    .subscribe(
      (data) => { 
        this.games = data; 
        this.openingGamesNumber = this.games.length;
        this.openingEfficiency = this.calculateEfficiency(this.games, this.username) 
      },
      (error) => { console.log(error) }
    );
    
  }

  onChangeSelectedGame() {
    this.selected = true;
    let dateTab = this.selectedGame.date.split(".");
    
    this.gameDate = new Date(parseInt(dateTab[0],10), parseInt(dateTab[1],10)-1, Number(dateTab[2])).toLocaleDateString()
    
    this.gameLabel =
      `${this.selectedGame.playerWhite} (${this.selectedGame.eloWhite}) - ${this.selectedGame.playerBlack} (${this.selectedGame.eloBlack}) : ${this.selectedGame.resultat} `


    this.gamePGN = this.selectedGame.pgn
    this.gameId = this.selectedGame.id
    this.gameOpening = this.selectedGame.opening
        this.moveNumber = -1;

    this.gamesService.getFens(this.gameId)
      .subscribe(
        (data) => {
          this.fens = data;
        },
        (error) => { console.log(error) }
      );

    this.gamesService.getSans(this.gameId)
      .subscribe(
        (data) => { this.sans = data; this.displayMovesInTable() },
        (error) => { console.log(error) },
        () => { this.getStats() }
      )

      this.startGame();

  }

  ngOnInit(): void {
    if (sessionStorage.getItem("champion") != null) 
    {
      this.username = sessionStorage.getItem("champion");
      this.currentPlayer = sessionStorage.getItem("championName");
      this.showBack= true
    }
    else  {
      this.username = sessionStorage.getItem("user");
      this.currentPlayer = this.username
      this.showBack=false
    }

    this.gamesService.getGamesByUsername(this.username)
      .subscribe(
        (data) => { 
          this.games = data;
          this.openingGamesNumber = this.games.length;
          this.openingEfficiency = this.calculateEfficiency(this.games, this.username) 
        },
        (error) => { console.log(error) }
      );

    

    this.gamesService.getOpeningsByUsername(this.username)
      .subscribe(
        (data) => { this.openings = data },
        (error) => { console.log(error) },
        () => this.openings.splice(0,0,ALL_OPENINGS)
      );

      this.championsService.getChampions()
      .subscribe(
        (data) => {   this.champions = data   },
        (error) => { console.log(error)}
      )

    this.startGame();
  }

  backToUser() {
    sessionStorage.removeItem("champion")
    sessionStorage.removeItem("championName")
    this.ngOnInit();
  }

  startGame(): void {
    this.myBoard = ChessBoard(
      'board1', { orientation: this.orientation, position: "start" }
    );
    if (this.moveNumber > 0) {
      this.shadeCell(COLOR_NORMAL, "normal", this.moveNumber)
    }

    this.moveNumber = -1;
    this.displayStats();

  }

  advanceGame(): void {
    if (this.moveNumber < this.fens.length - 2) {
      this.moveNumber++

      if (this.moveNumber > 0) this.shadeCell(COLOR_NORMAL, "normal", this.moveNumber - 1);
      this.shadeCell(COLOR_MOVE, "bold", this.moveNumber);

      this.myBoard = ChessBoard(
        'board1', { orientation: this.orientation, position: this.fens[this.moveNumber + 1] }
      );
      this.displayStats();

      

    }
  }

  withdrawGame(): void {
    if (this.moveNumber >= 0) {
      this.moveNumber--
      this.myBoard = ChessBoard(
        'board1', { orientation: this.orientation, position: this.fens[this.moveNumber + 1] }
      );
      this.displayStats();

      this.shadeCell(COLOR_NORMAL, "normal", this.moveNumber + 1);
      if (this.moveNumber > - 1) this.shadeCell(COLOR_MOVE, "bold", this.moveNumber);

    }
  }

  lastMoveGame(): void {
    if (this.fens.length > 0) {
      this.myBoard = ChessBoard(
        'board1', { orientation: this.orientation, position: this.fens[this.fens.length - 1] }
      );

      if (this.moveNumber >= 0) this.shadeCell(COLOR_NORMAL, "normal", this.moveNumber)

      this.moveNumber = this.fens.length - 2;
      this.displayStats();
      this.shadeCell(COLOR_MOVE, "bold", this.moveNumber);
    }

  }

  displayStats(): void {

    if (this.moveNumber >= -1) {
    
      this.playedGamesByPosition = this.stats[this.moveNumber + 1].playedGames
      console.log(this.playedGamesByPosition)
      this.points = this.stats[this.moveNumber + 1].points / 100
      console.log(this.points)

      console.log(this.fens[this.moveNumber + 1])

      //this.getNextMovesByFen(this.fens[this.moveNumber + 1], this.champions)
     // console.log("--> " + JSON.stringify(this.sanstats))
    }
  }

  getStats(): void {
    this.gamesService.getMyStats(this.gameId)
      .subscribe(
        (data: FenStat[]) => { this.stats = data }
      );
  }



  shadeCell(color: string, weight: string, move: number) {
    let even: boolean = Math.round(move / 2) == Math.trunc(move / 2)

    let id = (even ? 'white-' : 'black-') + Math.trunc(move / 2)

    document.getElementById(id).style.background = color;
    document.getElementById(id).style.fontWeight = weight;
  }

  displayMovesInTable(): void {
    this.fullMoves.splice(0, this.fullMoves.length);

    if (this.sans.length > 0) {
      let n = Math.trunc(this.sans.length / 2)
      for (let i = 0; i <= n; i++) {
        let fm = new FullMove(this.sans[2 * i], this.sans[2 * i + 1])
        this.fullMoves.push(fm);

        //console.log (this.fullMoves[i].white + " .." + this.fullMoves[i].black)
      }
    }
  }

  calculateEfficiency(games : Game[], username : string) : number {
    if (games.length == 0) return 0;

    let points : number = 0;
    
    for (let g of games)  {
      if (g.resultat == DRAW) points+=0.5
      if (g.playerWhite == username && g.resultat == WHITE_VICTORY) points++
      if (g.playerBlack == username && g.resultat == BLACK_VICTORY) points++
    }
    return points/games.length
}  
  
  reverseColors(): void {
    this.myBoard.flip()
    this.orientation === "white" ? this.orientation = "black" : this.orientation = "white"
  }

  getNextMovesByFen(fen: string, champions: Array<Champion>) {
    
    let observableBatch = []

    for (let champion of champions) {
      //console.log(JSON.stringify(champion))
      observableBatch.push(this.statisticsService.getNextMovesByFenAndUsername(fen, champion.username))
      
    }

    forkJoin(observableBatch).subscribe
    (
      (data: String[]) => 
      {  
        //console.log("data : "+JSON.stringify(data)); 
        this.nextMoves.concat(data)
        this.sanstats = this.getNextSanStatsByFen(fen, champions)
      },
      
    )
  
    
  }

  getNextSanStatsByFen(fen: string, champions: Array<Champion>): SanStat[] {
    
    //this.getNextMovesByFen(fen, champions)

    console.log("NextMoves ---------------->");
    console.log( JSON.stringify(this.nextMoves));
    let sanstats: Array<SanStat> = new Array<SanStat>();

    let nextMovesSet = new Set(this.nextMoves)
    for (let move of nextMovesSet) {
      let nb: number = this.nextMoves.filter(x => x == move).length
      sanstats.push(new SanStat(move, nb))

    }

    return sanstats

  }

}
