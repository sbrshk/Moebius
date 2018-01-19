import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StartpageComponent } from './components/StartPageComponent/startpage.component';
import { SidebarComponent } from './components/SidebarComponent/sidebar.component';
import { DisplayComponent } from './components/2d/DisplayComponent/display.component';
import { Display3dComponent } from './components/3d/Display3dComponent/display3d.component';
import { ReferenceComponent } from './components/Reference/reference.component';

import { StateService } from './components/state.service';

const appRoutes: Routes = [
  // {
  //   path: 'start',
  //   component: StartpageComponent
  // },
  {
    path: '2d',
    component: DisplayComponent
  },
  {
    path: '3d',
    component: Display3dComponent
  },
  {
    path: 'ref',
    component: ReferenceComponent
  },
  {
    path: '',
    redirectTo: '2d',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StartpageComponent,
    DisplayComponent,
    Display3dComponent,
    SidebarComponent,
    ReferenceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
