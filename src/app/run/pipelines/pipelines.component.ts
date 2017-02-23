import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-pipelines',
  templateUrl: 'pipelines.component.html',
  styleUrls: [/* Uncomment when styles are added './pipelines.component.scss'*/]
})
export class PipelinesComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    
  }

}
