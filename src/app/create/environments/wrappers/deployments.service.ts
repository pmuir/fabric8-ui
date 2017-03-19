import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//  TODO HACK
import { createDeploymentViews } from 'fabric8-runtime-console/src/app/kubernetes/view/deployment.view';
import { CompositeDeploymentStore } from 'fabric8-runtime-console/src/app/kubernetes/store/compositedeployment.store';
import { ServiceStore } from 'fabric8-runtime-console/src/app/kubernetes/store/service.store';

@Injectable()
export class DeploymentsService {

  constructor(private deploymentsStore: CompositeDeploymentStore, private serviceStore: ServiceStore) {
  }

  get deployments(): Observable<any[]> {
    return Observable.combineLatest(this.deploymentsStore.loadAll(), this.serviceStore.loadAll(), createDeploymentViews);
  }


}
