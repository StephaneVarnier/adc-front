import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService { 
  
  URL_FETCH_SERVER : string =  "http://localhost:3000/fetchUserGames"

  public fetchUserGames (username : string) : Observable<string> {
    
    return this.http.get<string>(this.URL_FETCH_SERVER + "/"+username)
  }

  constructor(private http : HttpClient ) { }
}
