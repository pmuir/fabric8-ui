import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-work',
  templateUrl: 'work.component.html',
  styleUrls: [/* Uncomment when styles are added './work.component.scss'*/]
})
export class WorkComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
