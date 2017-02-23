import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-settingsOverview',
  templateUrl: 'settings-overview.component.html',
  styleUrls: [/* Uncomment when styles are added './settings-overview.component.scss'*/]
})
export class SettingsOverviewComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
