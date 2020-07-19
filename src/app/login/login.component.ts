import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Login } from '../common/data/login';
import { LoginService } from '../common/services/login.service';
import { Router } from '@angular/router';

const WRONG_PASSWORD = "Wrong password !!!"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login : Login = new Login();
  
  message : String = "";
  

 

  doLogin() {
    this.loginService.getUser(this.login).subscribe(
      (response)=>{
        if (response.password === this.login.password) 
        {
          this.message = "";
          
          this.router.navigate(['games'])
          console.log(sessionStorage.getItem("user"))
          this.loginService.isUserLoggedIn.next(true);
        
        }
        else {
          this.login.password = "";
         
          this.message = WRONG_PASSWORD;
          sessionStorage.removeItem("user")
         
        }},
      (error) => { 
        console.log(error.error.error)
        if (error.error.error == "Bad Request") {this.message = this.login.username + " has not been registered yet"}}
    
       

      )
      
      
    

  }

  onSignUp() {
    this.router.navigate(['register'])
  }
  
  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("user");
    this.loginService.isUserLoggedIn.next(false);
   
  }

}
