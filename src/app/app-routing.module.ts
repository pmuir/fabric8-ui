import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { trimEnd } from 'lodash';

import { ContextResolver } from './shared/context-resolver.service';


export function removeAction(url: string) {
  return trimEnd(url.replace(/\(action:[a-z-]*\)/, ''), '/');
}

export const routes: Routes = [

  // Only relevant locally, as the landing page sits on / in production
  {
    path: '',
    loadChildren: './landing-page/landing-page.module#LandingPageModule',
    pathMatch: 'full'
  },

  // Home
  {
    path: '_home',
    loadChildren: './home/home.module#HomeModule'
  },

  // Profile
  {
    path: ':entity',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './profile/profile.module#ProfileModule'
  },

  // Settings
  {
    path: ':entity/_settings',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './settings/settings.module#SettingsModule'
  },

  // Analyze
  {
    path: ':entity/:space',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './analyze/analyze.module#AnalyzeModule'
  },

  // Plan
  {
    path: ':entity/:space/plan',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './plan/plan.module#PlanModule'
  },

  // Plan board
  {
    path: ':entity/:space/plan/board',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './plan/board/board.module#BoardModule'
  },

  // Create
  {
    path: ':entity/:space/create',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './create/create.module#CreateModule'
  },

  // Space-settings
  {
    path: ':entity/:space/settings',
    resolve: {
      context: ContextResolver
    },
    loadChildren: './space-settings/space-settings.module#SpaceSettingsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
