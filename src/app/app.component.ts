/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppState } from './app.service';
import { ContextService } from './shared/context.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'f8-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(
    private appState: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private context: ContextService) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.context.computeContext2(this.route);
    });
  }

}
