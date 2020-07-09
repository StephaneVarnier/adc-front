import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../data/champion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  BASE_URL = "https://adc-leaderboard.herokuapp.com"
  URL_CHAMPIONS = this.BASE_URL+"/archiduchess/leaders"

  public getChampions () : Observable<Champion[]> {
    
    return this.http.get<Champion[]>(this.URL_CHAMPIONS)
       
  }
  
  constructor(private http : HttpClient) { }
}
