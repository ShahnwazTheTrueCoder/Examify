import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayout } from '../layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [
    MainLayout
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Examify';
}
