import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/common/data/login';
import { LoginService } from 'src/app/common/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/data/user';
import { FetchService } from 'src/app/common/services/fetch.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user : User = new User() ;
  message: String = "";
  registeredUsers = [];

  constructor(private router: Router, public loginService: LoginService, public fetchService: FetchService) { }

  ngOnInit(): void {
  }

  doSignUp() {

    this.loginService.getAllUsernames().subscribe(
      (user) => {
        this.registeredUsers = user
        console.log(this.registeredUsers)
        if (!this.registeredUsers.some((user) => (user == this.user.username))) 
        { 
          this.fetchService.fetchUserGames(this.user.username).subscribe((res)=>console.log(res))
          console.log("downloading "+this.user.username+"'s games") 
          
          this.loginService.postUser(this.user).subscribe( 
              () => {
                this.message = "New user : " + this.user.username + " has been registered"
                sessionStorage.setItem("user", this.user.username)
                this.router.navigate(['games'])
              }
            )
        }
        else this.message = "The user " + this.user.username + " has already been registered"
      }
    )

  }

}
