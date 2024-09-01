import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatTabsModule, MatSidenavModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedContent: string = 'tab1';
  previousContent: string = 'tab1';
  isContentVisible: number | null = null;

  selectContent(tab: string) {
    this.previousContent = this.selectedContent;
    this.selectedContent = tab;
  }

  getTransform() {
    switch (this.selectedContent) {
      case 'tab1': return 'translate-x-0';
      case 'tab2': return '-translate-x-full';
      case 'tab3': return '-translate-x-2/4';
      case 'tab4': return '-translate-x-3/4';
      case 'tab5': return '-translate-x-4/4';
      case 'tab6': return '-translate-x-full';
      default: return 'translate-x-0';
    }
  }

  getTransition() {
    return this.selectedContent !== this.previousContent ? 'transition-transform duration-500 ease-in-out' : '';
  }

  toggleContent(index: number) {
    if (this.isContentVisible === index) {
      this.isContentVisible = null;
    } else {
      this.isContentVisible = index;
    }
  }

}
