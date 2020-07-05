import { Component, OnInit } from '@angular/core';
import { ChampionsService } from '../common/services/champions.service';
import { Champion } from '../common/data/champion';
import { Router } from '@angular/router';
import { GamesService } from '../common/services/games.service';
import { Game } from '../common/data/game';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

  champions : Array<Champion> = new Array<Champion>();

  constructor(public championsService : ChampionsService, public gamesService : GamesService, private router:Router) { }

  ngOnInit(): void {

    this.championsService.getChampions()
    .subscribe(
      (data) => {
        this.champions = data;
        for (let champion of this.champions) {
         // let games : Array<Game> = new Array<Game>();
          this.gamesService.getGamesByUsername(champion.username).subscribe(
            (resp) => ( champion.numberOfGames = resp.length)
          );
        }
      
      },
      (error) => { console.log(error)}
    )

    
    


  }

  onDisplayChampion(champion : Champion) {
    sessionStorage.setItem("champion", champion.username)
    sessionStorage.setItem("championName", champion.name)
    
    this.router.navigate(['/games'])
  }

}
