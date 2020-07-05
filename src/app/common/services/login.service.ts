import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../data/login';
import { Observable } from 'rxjs';
import { User } from '../data/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  url = "./archiduchess/users";

  public getUser(login: Login): Observable<User> {
    let AuthentificationUrl : string = this.url+"/"+login.username ; 
    console.log(AuthentificationUrl)
    return this.http.get<User>(AuthentificationUrl)
    .pipe(
       tap( (logRes) => { this.saveUser(logRes)})
    )
  }

  public saveUser(user : User) {
    if (user != null) sessionStorage.setItem("user", user.username)
    //else (localStorage.setItem("token", null))
  }


  constructor(private http : HttpClient) { }
}
