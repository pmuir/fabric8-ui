import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-workspaces',
  templateUrl: 'workspaces.component.html',
  styleUrls: [/* Uncomment when styles are added './workspaces.component.scss'*/]
})
export class WorkspacesComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    
  }

}
