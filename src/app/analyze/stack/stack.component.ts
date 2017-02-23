import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'alm-stack',
  templateUrl: 'stack.component.html',
  styleUrls: [/* Uncomment when styles are added './stack.component.scss'*/]
})
export class StackComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

}
