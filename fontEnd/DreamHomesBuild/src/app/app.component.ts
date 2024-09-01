import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./user/pages/footer/footer.component";
import { HeaderComponent } from "./user/pages/header/header.component";
import { HomeComponent } from "./user/pages/home/home.component";
import { BackToTopComponent } from './user/pages/back-to-top/back-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, HomeComponent,BackToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DreamHomesBuild';
}
