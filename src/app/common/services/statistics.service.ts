import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesService } from './games.service';
import { ChampionsService } from './champions.service';
import { Champion } from '../data/champion';
import { Observable } from 'rxjs';
import { SanStat } from '../data/SanStat';

const URL_ONLINE_GAMES = "./archiduchess/onlineGames";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  //champions :  Array<Champion> = new Array<Champion>();






  getNextMovesByFenAndUsername(fen: string, user: string): Observable<String[]> {

    let url: string = URL_ONLINE_GAMES + "/nextMoves/user/" + user + "/fen/" + fen;
   // let nextMoves: String[];

    return this.http.get<String[]>(url)

    //return nextMoves;
  }

  // getNextMovesByFen(fen: string, champions: Array<Champion>): String[] {
  //   let nextMoves: Array<String> = new Array<String>();
  //   for (let champion of champions) {
  //     nextMoves.concat(this.getNextMovesByFenAndUsername(fen, champion.username));
  //   }
  //   return nextMoves;
  // }

  // getNextSanStatsByFen(fen: string, champions: Array<Champion>): SanStat[] {
  //   let nextMoves = this.getNextMovesByFen(fen, champions)
  //   let sanstats: Array<SanStat> = new Array<SanStat>();

  //   let nextMovesSet = new Set(nextMoves)
  //   for (let move of nextMovesSet) {
  //     let nb: number = nextMoves.filter(x => x == move).length
  //     sanstats.push(new SanStat(move, nb))

  //   }

    // return sanstats

  // }



  constructor(private http: HttpClient, public gamesService: GamesService, public championsService: ChampionsService) { }
}
