import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../data/champion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  URL_CHAMPIONS = "./archiduchess/leaders"

  public getChampions () : Observable<Champion[]> {
    
    return this.http.get<Champion[]>(this.URL_CHAMPIONS)
       
  }
  
  constructor(private http : HttpClient) { }
}
