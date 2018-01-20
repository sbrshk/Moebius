import { Component, OnInit } from '@angular/core';

import { StateService } from './components/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/sass/components/app.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  startPage: boolean;

  constructor(private state: StateService) {}

  ngOnInit() {
    this.startPage = true;
    this.state.startPageLeft.subscribe((value) => {
      this.startPage = false;
    });
  }
}
