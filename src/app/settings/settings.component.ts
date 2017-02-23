import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-code',
  templateUrl: './settings.component.html',
  styleUrls: [/* Uncomment when styles are added './settings.component.scss'*/]
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
