import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Context } from './../models/context';
import { DummyService } from './../dummy/dummy.service';
import { Broadcaster } from '../shared/broadcaster.service';

import 'rxjs/add/operator/switchMap';



/*
 * A shared service that manages the users current context. The users context is defined as the
 * entity (user or org) and space that they are operating on.
 *
 */
@Injectable()
export class ContextService {

  private _current: Context;
  constructor(
    private dummy: DummyService,
    private router: Router,
    private broadcaster: Broadcaster,
    private route: ActivatedRoute
  ) {
    // Listen for any context refreshes requested by the app
    this.broadcaster.on<string>('refreshContext').subscribe(message => {
      this.computeContext();
    });
    // Compute the initial context
    this.computeContext();
  }

  get current(): Context {
    return this._current;
  }

  computeContext2(route: ActivatedRoute) {
    console.log('Computing context');
    route.params
      .switchMap((params: Params) => this.getContext(params['entity'], params['space']))
      .subscribe((ctx: Context) => this._current = ctx)
      ;
  }

  private getContext(entity: String, space: String): Promise<Context> {
    console.log('entity: ' + entity + '; space: ' + space + ';');
    return new Promise((resolve, reject) => {
        resolve(this._current);
      });
  }

  private computeContext() {
    // Find the most specific context menu path and display it
    let c;
    for (let m of this.dummy.contexts) {
      if (this.router.url.startsWith(m.path)) {
        if (c == null || m.path.length > c.path.length) {
          c = m;
        }
      }
    }
    this._current = c || this.dummy.defaultContext;
    if (this.current.type.menus) {
      for (let n of this.current.type.menus) {
        // Build the fullPath if not already done
        n.fullPath = n.fullPath || this.buildPath(this.current.path, n.path);
        // Clear the menu's active state
        n.active = false;
        if (n.menus) {
          for (let o of n.menus) {
            // Build the fullPath if not already done
            o.fullPath = o.fullPath || this.buildPath(this.current.path, n.path, o.path);
            // Clear the menu's active state
            o.active = false;
            if (o.fullPath === this.router.url) {
              o.active = true;
              n.active = true;
            }
          }
        } else if (n.fullPath === this.router.url) {
          n.active = true;
        }
      }
    }
  }

  private buildPath(...args: string[]): string {
    let res = '';
    for (let p of args) {
      if (p.startsWith('/')) {
        res = p;
      } else {
        res = res + '/' + p;
      }
      res = res.replace(/\/*$/, '');
    }
    return res;
  }

}
