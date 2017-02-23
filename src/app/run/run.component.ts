import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-run',
  templateUrl: 'run.component.html',
  styleUrls: [/* Uncomment when styles are added './run.component.scss'*/]
})
export class RunComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    
  }

}
