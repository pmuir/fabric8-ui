import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Broadcaster } from 'ngx-base';
import { Contexts } from 'ngx-fabric8-wit';

import { DummyService } from './../shared/dummy.service';

@Component({
    host: {
    'class': 'app-component flex-container in-column-direction flex-grow-1'
  },
  selector: 'fabric8-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  constructor(
    private context: Contexts,
    private broadcaster: Broadcaster,

  ) { }

  ngOnInit() {
    this.context.current.subscribe(context => console.log('Context', context));
  }

}
