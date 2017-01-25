import { ContextService } from './../../shared/context.service';
import { UserService } from './../../user/user.service';
import { DummyService } from './../../dummy/dummy.service';
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


@Component({
  selector: 'alm-overview',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
