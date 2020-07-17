import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesService } from './games.service';
import { ChampionsService } from './champions.service';
//import { Champion } from '../data/champion';
import { Observable } from 'rxjs';
import { FenStat } from '../data/fenStat';
//import { SanStat } from '../data/SanStat';


const URL_CHESS_STATS = "http://localhost:9996/archiduchess/stats"

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  






  getStatsByUserAndGameId(user: string, gameId : string): Observable<FenStat[]> {

    let url: string = URL_CHESS_STATS + "/user/" + user + "/gameId/" + gameId;
  
    return this.http.get<FenStat[]>(url)

  }




  constructor(private http: HttpClient, public gamesService: GamesService, public championsService: ChampionsService) { }
}
