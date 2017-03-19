import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'ngx-login-client';

import { Space, SpaceService, Spaces, Contexts } from 'ngx-fabric8-wit';

import {
  ToolbarConfig,
  FilterConfig,
  FilterQuery,
  FilterEvent,
  Filter,
  SortEvent,
  SortField,
  TreeListItemComponent
} from 'ngx-widgets';

import {
  TreeComponent,
  TreeNode,
  TREE_ACTIONS,
  KEYS,
  IActionMapping
} from 'angular2-tree-component';

import { SwitchableNamespaceScope } from './switchable-namepsace.scope';


// TODO HACK
import { OnLogin } from 'fabric8-runtime-console/src/app/shared/onlogin.service';
import { OAuthConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/oauth-config-store';
import {
  BuildConfig, BuildConfigs,
  combineBuildConfigAndBuilds,
  filterEnvironments
} from 'fabric8-runtime-console/src/app/kubernetes/model/buildconfig.model';
import { APIsStore } from 'fabric8-runtime-console/src/app/kubernetes/store/apis.store';
import { BuildConfigStore } from 'fabric8-runtime-console/src/app/kubernetes/store/buildconfig.store';
import { BuildStore } from 'fabric8-runtime-console/src/app/kubernetes/store/build.store';
import { BuildConfigService } from 'fabric8-runtime-console/src/app/kubernetes/service/buildconfig.service';


class Environment {
  name: string;
  type: EnvironmentType;
  namespaceRef: string;
  space: Space;
}

class EnvironmentType {


  public static readonly DEV = { name: 'dev' } as EnvironmentType;
  public static readonly INT = { name: 'int' } as EnvironmentType;
  public static readonly PROD = { name: 'prod' } as EnvironmentType;

  name: string;

  public static readonly MAPPED: Map<string, EnvironmentType> = new Map([
    [EnvironmentType.DEV.name, EnvironmentType.DEV],
    [EnvironmentType.INT.name, EnvironmentType.INT],
    [EnvironmentType.PROD.name, EnvironmentType.PROD],
  ]);

}

@Component({
  selector: 'alm-environments',
  templateUrl: 'environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  environments: Observable<Environment[]>;

  nodes: any[] = [
    {
      name: 'asyncroot',
      hasChildren: true
    }
  ];
  // See: https://angular2-tree.readme.io/docs/options
  options = {
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        },
        click: (tree, node, $event) => {
          TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
      }
    },
    allowDrag: false,
    isExpandedField: 'expanded',
    getChildren: this.getChildren.bind(this)
  };

  asyncChildren = [{
    name: 'child2.1',
    subTitle: 'new and improved'
  }, {
    name: 'child2.2',
    subTitle: 'new and improved2'
  }];

  selectedTreeListItem: TreeListItemComponent;

  toolbarConfig: ToolbarConfig;
  private _apps: FilterQuery[] = [];
  private _codebases: FilterQuery[] = [];
  private _appliedFilters: Filter[] = [];
  private _ascending: boolean;
  private _currentSortField: SortField = {
    id: 'application',
    title: 'Application',
    sortType: 'alpha'
  } as SortField;


  constructor(
    contexts: Contexts
  ) {
    // TODO DUMMY Set up a couple of dummy environments for the current space
    // NOTE This requires you to manually set up the right projects in OpenShift
    //      <username>-dev and <username>-int
    this.environments = contexts.current
      .map(context => ['dev', 'int'].map(env => ({
        name: `${context.space.attributes.name} (${env.slice(0, 1).toLocaleUpperCase()}${env.slice(1, env.length)})`,
        type: EnvironmentType.MAPPED.get(env),
        namespaceRef: `${context.user.attributes.username}-${env}`,
        space: context.space
      } as Environment)));

    // Configure the toolbar
    this.toolbarConfig = {
      filterConfig: {
        fields: [
          {
            id: 'application',
            title: 'Application',
            placeholder: 'Filter by Application...',
            type: 'select',
            queries: this._apps
          },
          {
            id: 'codebase',
            title: 'Codebase',
            placeholder: 'Filter by Codebase...',
            type: 'select',
            queries: this._codebases
          }
        ],
        appliedFilters: [],
        resultsCount: 0,
        tooltipPlacement: 'right'
      } as FilterConfig,
      sortConfig: {
        fields: [
          {
            id: 'application',
            title: 'Application',
            sortType: 'alpha'
          },
          {
            id: 'codebase',
            title: 'Codebase',
            sortType: 'alpha'
          }
        ]
      }
    } as ToolbarConfig;
  }

  ngOnInit() {
    this.environments.subscribe(val => console.log(val));
  }

  // CODE RELATED TO WIDGETS

  filterChange($event: FilterEvent) {
    this._appliedFilters = $event.appliedFilters;
    //this.applyFilters();
  }

  sortChange($event: SortEvent) {
    this._currentSortField = $event.field;
    this._ascending = $event.isAscending;
    //this.applySort();
  }

  applySort() {
    //this._filteredPipelines.sort((a: any, b: any) => this.compare(a, b));
  }

  getChildren(node: TreeNode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  select(treeListItem: TreeListItemComponent): void {
    // de-select prior selected element (if any)
    if (this.selectedTreeListItem && this.selectedTreeListItem !== treeListItem) {
      this.selectedTreeListItem.setSelected(false);
    }
    treeListItem.setSelected(true);
    this.selectedTreeListItem = treeListItem;
  }

  /*compare(a: any, b: any) {
    let res = 0;

    if (this._currentSortField.id === 'application' && a.labels.app && b.labels.app) {
      res = a.labels.app.localeCompare(b.labels.app);
    } else if (this._currentSortField.id === 'codebase' && a.labels.codebase && b.labels.codebase) {
      res = a.labels.codebase.localeCompare(b.labels.codebase);
    }

    if (!this._ascending) {
      res = res * -1;
    }
    return res;
  }*/


  /*applyFilters() {
    if (this._allPipelines) {
      let filteredPipelines = [];
      this._allPipelines.forEach(bc => {
        let matches = true;
        this._appliedFilters.forEach(filter => {
          if (filter.field.id === 'application') {
            if (filter.value !== bc.labels.app) {
              matches = false;
            }
          } else if (filter.field.id === 'codebase') {
            if (filter.value !== bc.labels.codebase) {
              matches = false;
            }
          }
        });
        if (matches) {
          filteredPipelines.push(bc);
        }
      });
      this._filteredPipelines = filteredPipelines;
    }
  }*/

}
