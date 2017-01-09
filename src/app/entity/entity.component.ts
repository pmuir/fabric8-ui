import { Component, OnInit } from '@angular/core';
import { Router }    from '@angular/router';

import { EntityItem } from './entity-item';
import { EntityService } from './entity.service';
import { AuthenticationService } from '../auth/authentication.service';


@Component({
  selector: 'alm-entity-form',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
})
export class EntityComponent implements OnInit {
  showError: boolean = false;
  feedbackMessage: string = '';
  statusCode: number = 0;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {

  }

}
