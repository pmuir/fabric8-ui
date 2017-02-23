import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-board',
  templateUrl: 'board.component.html',
  styleUrls: [/* Uncomment when styles are added './board.component.scss'*/]
})
export class BoardComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    
  }

}
