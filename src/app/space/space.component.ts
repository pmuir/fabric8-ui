import { Component, OnInit } from '@angular/core';
import { Router }    from '@angular/router';

import { SpaceItem } from './space-item';
import { SpaceService } from './space.service';
import { AuthenticationService } from '../auth/authentication.service';


@Component({
  selector: 'alm-space-form',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent implements OnInit {
  showError: boolean = false;
  feedbackMessage: string = '';
  statusCode: number = 0;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {

  }

}
