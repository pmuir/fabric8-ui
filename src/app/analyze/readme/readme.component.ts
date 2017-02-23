import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-readme',
  templateUrl: 'readme.component.html',
  styleUrls: [/* Uncomment when styles are added './readme.component.scss'*/]
})
export class ReadmeComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
