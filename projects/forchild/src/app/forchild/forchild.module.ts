import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoggerModule} from '../../../../ngx-logging-kit/src/public-api';
import {ForchildComponent} from './forchild.component';

const forchildRoutes = [
  {
    path: '',
    component: ForchildComponent,
  }
];

@NgModule({
  declarations: [
    ForchildComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(forchildRoutes),
    LoggerModule.forChild(),
  ],
})
export class ForchildModule {
}
