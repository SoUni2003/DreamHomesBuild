import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
  isVisible: boolean = false;

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    this.isVisible = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
