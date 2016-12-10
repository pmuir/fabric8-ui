/*
 * Bootstrap the webworker which contains angular and the app
 */
import {bootstrapWorkerUi} from '@angular/platform-webworker';
bootstrapWorkerUi('../webworker.js');
