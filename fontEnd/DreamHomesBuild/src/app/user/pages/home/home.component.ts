import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatTabsModule, MatSidenavModule, MatListModule, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('slideAnimation', [
      state('void', style({ position: 'absolute', width: '100%' })),
      transition(':enter', [
        style({ transform: 'translateX({{enterTransform}})' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)' }))
      ], { params: { enterTransform: '100%' } }),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX({{leaveTransform}})' }))
      ], { params: { leaveTransform: '-100%' } })
    ])
  ]
  
  
})
export class HomeComponent {
  isContentVisible: number | null = null;
  showArchi: number | null = null

  selectedContent: string = 'tab1';
  previousContent: string = '';

  selectContent(tab: string) {
    this.previousContent = this.selectedContent;
    this.selectedContent = tab;
  }

  getAnimationParams() {
    const isSwitchingRight = this.previousContent && (this.previousContent < this.selectedContent);
    return {
      value: this.selectedContent === this.previousContent ? 'enter' : 'leave',
      params: {
        enterTransform: isSwitchingRight ? '100%' : '-100%',
        leaveTransform: isSwitchingRight ? '-100%' : '100%'
      }
    };
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

  toggleArchi(index: number) {
    if(this.showArchi === index){
      this.showArchi =null ;
    }else{
      this.showArchi = index
    }
  }

}
