import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';

import { ConsoleComponent } from './components/ConsoleComponent/console.component';
import { DisplayComponent } from './components/DisplayComponent/display.component';

const appRoutes: Routes = [
  {
    path: 'console',
    component: ConsoleComponent
  },
  {
    path: 'display',
    component: DisplayComponent
  },
  {
    path: '',
    redirectTo: 'console',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
