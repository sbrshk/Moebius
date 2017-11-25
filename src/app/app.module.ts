import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { SidebarComponent } from './components/SidebarComponent/sidebar.component';
// import { DisplayComponent } from './components/DisplayComponent/display.component';

import { TwoDComponent } from './components/2d/2d.component';
import { ThreeDComponent } from './components/3d/3d.component';

const appRoutes: Routes = [
  {
    path: '2d',
    component: TwoDComponent
  },
  {
    path: '3d',
    component: ThreeDComponent
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
    TwoDComponent,
    ThreeDComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
