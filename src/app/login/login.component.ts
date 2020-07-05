import { Component, OnInit } from '@angular/core';
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
        }
        else {
          this.login.password = "";
          this.message = WRONG_PASSWORD;
          sessionStorage.removeItem("user")
        }},
      (error) => { console.log(error)}
      );
  }
  
  constructor(private router : Router, public loginService : LoginService) { }

  ngOnInit(): void {
  }

}
