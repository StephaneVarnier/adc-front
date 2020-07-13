import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/common/data/login';
import { LoginService } from 'src/app/common/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/data/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  user : User = new User() ;
  message: String = "";
  registeredUsers = [];

  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
  }

  doSignUp() {

    this.loginService.getAllUsernames().subscribe(
      (user) => {
        this.registeredUsers = user
        console.log(this.registeredUsers)
        if (!this.registeredUsers.some((user) => (user == this.user.username))) 
        {
          console.log("registering : " + this.user.username)
          this.loginService.postUser(this.user).subscribe( () => console.log("done"))
        }
      }
    )

  }

}
