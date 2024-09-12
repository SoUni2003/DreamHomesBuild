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

  tabs = [
    {
      title: "Xây dựng nhà ở",
      description: "Chúng tôi cung cấp dịch vụ xây dựng nhà ở chất lượng cao, đảm bảo an toàn và thẩm mỹ.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    },
    {
      title: "Thiết kế công trình",
      description: "Đội ngũ kiến trúc sư giàu kinh nghiệm của chúng tôi sẽ thiết kế công trình đáp ứng mọi nhu cầu của bạn.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    },
    {
      title: "Xây dựng công nghiệp",
      description: "Chúng tôi chuyên xây dựng các công trình công nghiệp với quy mô lớn và độ phức tạp cao.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    },
    {
      title: "Nội thất",
      description: "Dịch vụ thiết kế và thi công nội thất của chúng tôi sẽ biến không gian của bạn thành tác phẩm nghệ thuật.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    },
    {
      title: "Sửa chữa cải tạo",
      description: "Chúng tôi cung cấp dịch vụ sửa chữa và cải tạo nhà ở, văn phòng với chất lượng cao.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    },
    {
      title: "Dịch vụ khác",
      description: "Ngoài ra, chúng tôi còn cung cấp nhiều dịch vụ khác liên quan đến xây dựng và thiết kế.",
      imageUrl: "https://kienthietviet.com/wp-content/uploads/2020/05/services-bg-1445x670-1.jpg"
    }
  ];

}
