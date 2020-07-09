import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { Game } from '../data/game';
import { HttpClientModule } from '@angular/common/http';
import { FenStat } from '../data/fenStat';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  URL_ONLINE_GAMES = "./archiduchess/onlineGames";
  URL_STATS =   "./archiduchess/fen-list-stats"

  public getGamesByOpeningAndUsername (opening : string, username : string) : Observable<Game[]> {
    
    if (opening == "")  return this.http.get<Game[]>(this.URL_ONLINE_GAMES+"/user/"+username)
    else return this.http.get<Game[]>(this.URL_ONLINE_GAMES+"/user/"+username+"/opening/"+opening)
   
  }

  public getGamesByUsername (username : string) : Observable<Game[]> {
    
    return this.http.get<Game[]>(this.URL_ONLINE_GAMES+"/user/"+username)
  }

  public getFens (id : number) : Observable<string[]> {

    let urlFen : string = this.URL_ONLINE_GAMES+"/"+id+"/fens";
    
    return this.http.get<string[]>(urlFen)
  }

  public getSans (id : number) : Observable<string[]> {

    let urlSan : string = this.URL_ONLINE_GAMES+"/"+id+"/sans";
    
    return this.http.get<string[]>(urlSan)
  }

  public getMyStats (id : number) : Observable<FenStat[]> {

    let urlPct : string = this.URL_ONLINE_GAMES+"/fen-list-stats/"+id+"/"+sessionStorage.getItem("user");
    
    return this.http.get<FenStat[]>(urlPct)
  }

  public getOpeningsByUsername (username : string) : Observable<string[]> {

    let urlOpenings : string = this.URL_ONLINE_GAMES+"/openings/"+username;
    
    return this.http.get<string[]>(urlOpenings)
  }

  public getByUsername

  constructor(private http : HttpClient) { }
}
