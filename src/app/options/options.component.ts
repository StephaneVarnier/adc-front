import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../common/services/preferences.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(public service : PreferencesService) { }

  ngOnInit(): void {
  }

}
