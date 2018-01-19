import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/sass/components/app.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  startPage: boolean;

  ngOnInit() {
    this.startPage = true;
  }
}
