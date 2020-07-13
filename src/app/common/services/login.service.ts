import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../data/login';
import { Observable } from 'rxjs';
import { User } from '../data/user';
import { tap, map, flatMap, toArray } from 'rxjs/operators';


//const BASE_URL_USERS = "https://adc-users.herokuapp.com"
const BASE_URL_USERS = "http://localhost:9998"

@Injectable({
  providedIn: 'root'
})



export class LoginService {
  

  //private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  url = BASE_URL_USERS + "/archiduchess/users";
  registerUrl = this.url +"/register"

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

  public postUser(user: User) {
    // console.log("postUser => " + user.username)
    // console.log("register url => "+this.registerUrl)
    // console.log(JSON.stringify(user))
    return this.http.post<User>(this.registerUrl ,user );
  }

  public getAllUsernames():Observable<String[]> {
    return this.http.get<User[]>(this.url).pipe(
      flatMap(e=>e),
      map( e => e.username),
      toArray())
  }

  public logOut() {
    sessionStorage.removeItem("user");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }


  constructor(private http : HttpClient) { }
}
