import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../common/services/preferences.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public service : PreferencesService) { }

  ngOnInit(): void {
  }

}
