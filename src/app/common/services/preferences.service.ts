import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  public colorsList = ["blue", "green", "red", "yellow", "orange", "coral", "cornflowerblue" ];
  public favoriteFontColor : string = "blue";
  public favoriteBackgroundColor : string = "orange";

  constructor() { }
}
