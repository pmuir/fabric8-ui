import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-plan',
  templateUrl: 'plan.component.html',
  styleUrls: [/* Uncomment when styles are added './plan.component.scss'*/]
})
export class PlanComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
