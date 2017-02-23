import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-security',
  templateUrl: 'security.component.html',
  styleUrls: [/* Uncomment when styles are added './security.component.scss'*/]
})
export class SecurityComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    
  }

}
