import {enableProdMode} from '@angular/core';

import {AppServerModule} from './app/app.server.module';
import {environment} from './environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppServerModule);


