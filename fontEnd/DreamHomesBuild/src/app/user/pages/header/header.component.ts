import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatTabsModule, MatSidenavModule, MatListModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  selectedContent: string = 'tab1';
  previousContent: string = 'tab1';
  isContentVisible: number | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 0;
  }

  selectContent(tab: string) {
    this.previousContent = this.selectedContent;
    this.selectedContent = tab;
  }

  getTransform() {
    // Di chuyển nội dung tab từ phải sang trái
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

  //content
  toggleContent(index: number) {
    if (this.isContentVisible === index) {
      this.isContentVisible = null;
    } else {
      this.isContentVisible = index;
    }
  }
}
