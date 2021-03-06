import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent} from './games/games.component';
import { OptionsComponent } from './options/options.component';
import { LoginComponent } from './login/login.component';
import { ChampionsComponent } from './champions/champions.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [

  { path: 'games', component: GamesComponent },
  { path: 'options', component: OptionsComponent },
  { path : '', redirectTo:'/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'champions', component: ChampionsComponent },
  { path: 'register', component: RegisterComponent }
  
 
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
