import { Component, OnInit, Input } from '@angular/core';
import { PreferencesService } from '../common/services/preferences.service';
import { LoginService } from '../common/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   userLogged : boolean 

  constructor(public service : PreferencesService, public loginService : LoginService) { 
    this.loginService.isUserLoggedIn.subscribe( value => {this.userLogged = value})
  }

 
  ngOnInit(): void {
   }

}
