import { Fabric8RuntimeConsoleService } from './fabric8-runtime-console.service';
import { SpaceNamespaceService } from './space-namespace.service';
import { Spaces } from 'ngx-fabric8-wit';
import { ObservableFabric8UIConfig } from './../config/fabric8-ui-config.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { SpaceNamespace } from 'fabric8-runtime-console';

@Injectable()
export class Fabric8UISpaceNamespace implements SpaceNamespace {

  constructor(
    private spaces: Spaces,
    private spaceNamespaceService: SpaceNamespaceService,
    private fabric8RuntimeConsoleService: Fabric8RuntimeConsoleService
  ) { }

  get namespaceSpace(): Observable<string> {
    return this.fabric8RuntimeConsoleService
      .loading()
      .switchMap(() => this.spaceNamespaceService.buildNamespace());
  }

  get labelSpace(): Observable<string> {
    return this.fabric8RuntimeConsoleService
      .loading()
      .switchMap(() => this.spaces.current.map(space => space.attributes.name))
      .do(val => console.log('labelSpaceStr', val));
  }

}
