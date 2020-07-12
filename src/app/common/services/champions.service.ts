import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../data/champion';
import { Observable } from 'rxjs';


const BASE_URL_LEADERS = "https://adc-leaderboard.herokuapp.com"
//const BASE_URL_LEADERS = "http://localhost:9997"

@Injectable({
  providedIn: 'root'
})



export class ChampionsService {

  
  URL_CHAMPIONS = BASE_URL_LEADERS+"/archiduchess/leaders"

  public getChampions () : Observable<Champion[]> {
    
    return this.http.get<Champion[]>(this.URL_CHAMPIONS)
       
  }
  
  constructor(private http : HttpClient) { }
}
