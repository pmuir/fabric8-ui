import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Routes, RouterModule } from '@angular/router';

export class Extension {
    id: string;
    label: string;
    description: string;
    path: string;
    icon: string;
    moduleFile: string;

    private dashedId: string;

    constructor (manifest: any, id: string) {
        if (manifest.id) {
            this.id = manifest.id;
        } else {
            this.id = this.camelize(id);
        }
        this.dashedId = this.dashize(this.id);
        if (manifest.label) {
            this.label = manifest.label;
        } else {
            this.label = this.humanize(this.id);
        }
        if (manifest.description) {
            this.description = manifest.description;
        }
        if (manifest.path) {
            this.path = manifest.path;
        } else {
            this.path =  this.dashedId;
        }
        if (manifest.icon) {
            this.icon = manifest.icon;
        } else {
            this.icon = './' + this.dashedId + '/' + this.dashedId + '.icon16.png';
        }
        if (manifest.modulePath) {
            this.moduleFile = manifest.moduleFile;
        } else {
            this.moduleFile = './'
                        + this.dashedId
                        + '/' + this.dashedId
                        + '.module';
        }
    }

    get routerConfig() {
        return {
            path: this.path,
            loadChildren: this.moduleFile + '#'
                        + this.id.charAt(0).toUpperCase()
                        + this.id.slice(1) + 'Module'
        };
    }

    private camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s|-|_+/g, '');
    }

    private humanize(str: string) {
        let result: string = str.replace( /([A-Z])/g, ' $1' );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    private dashize(str: string) {
        return str.replace( /([A-Z])/g, function(letter, index) {
            return '-' + letter.toLowerCase();
        });
    }
}

@Injectable()
export class Extensions {

    extensionsUrl = '/extensions.json';

    loaded: Object[] = [];

    private isLoaded: boolean = false;

    constructor (private http: Http, private router: Router) {}

    load() {
        this.http.get('/extensions.json')
            .map((res: Response) => {
                 this.loadExtensions(res.json());
            })
            .subscribe(res => {});
    }

    private loadExtensions(registry: any) {
        for (let e of registry.extensions) {
            let path: string = 'app/' + e.toString() + '/' + e.toString() + '.manifest.json';
            // Allow specification of absolute paths
            if (e.toString().endsWith('manifest.json')) {
                path = e.toString();
            }
            this.http.get(path)
            .map((res: Response) => {
                 return new Extension(res.json(), e);
            })
            .subscribe(res => {
                this.loaded.push(res);
                // Not working right now due to webpack
                // this.loadRoute(res);
            });
        }
    }

    private loadRoute(ext: Extension) {
        let routerConfig = this.router.config;
        console.log(routerConfig);
        console.log(JSON.stringify(ext.routerConfig));
        if (!this.isLoaded) {
            console.log(ext.moduleFile + '.ts');
            routerConfig.unshift(ext.routerConfig);
            console.log('/lazy route added', routerConfig);
            this.router.resetConfig(routerConfig);
            this.isLoaded = true;
        }
    }
}
