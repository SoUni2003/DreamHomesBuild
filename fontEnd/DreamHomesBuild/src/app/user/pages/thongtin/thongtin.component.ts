import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, fromEvent, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-thongtin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thongtin.component.html',
  styleUrls: ['./thongtin.component.scss']
})
export class ThongtinComponent implements OnInit {
  @ViewChild('rulerContainer') rulerContainer!: ElementRef;
  rulerValue = 1140;
  rulerPosition = 0;
  isDragging = false;
  startX = 0;
  private lastDelta = 0;

  rulers = [
    {
      name: 'Thước Lỗ Ban 52.2cm',
      description: 'Khoảng không thông thủy (cửa, cửa sổ...)',
      image: 'https://kaizenarchi.vn/wp-content/plugins/devvn-thuoc-lo-ban/includes/thuoc522.php?trimStart=2000&rulerLength=1000',
      segments: [
        { name: 'Tài', isRed: false },
        { name: 'Bệnh', isRed: true },
        { name: 'Ly', isRed: false },
        { name: 'Nghèo', isRed: true },
        { name: 'Quan', isRed: false },
        { name: 'Thê', isRed: true },
        { name: 'Tử', isRed: false },
        { name: 'Súc', isRed: true }
      ]
    },
    {
      name: 'Thước Lỗ Ban 42.9cm',
      description: 'Chiều cao (trần, cửa, bàn thờ...)',
      image: 'https://kaizenarchi.vn/wp-content/plugins/devvn-thuoc-lo-ban/includes/thuoc429.php?trimStart=2000&rulerLength=1000',
      segments: [
        { name: 'Tài', isRed: false },
        { name: 'Bệnh', isRed: true },
        { name: 'Ly', isRed: false },
        { name: 'Nghèo', isRed: true },
        { name: 'Quan', isRed: false },
        { name: 'Thê', isRed: true },
        { name: 'Tử', isRed: false },
        { name: 'Súc', isRed: true }
      ]
    },
    {
      name: 'Thước Lỗ Ban 38.8cm',
      description: 'Chiều ngang (bề ngang nhà, nội thất...)',
      image: 'https://kaizenarchi.vn/wp-content/plugins/devvn-thuoc-lo-ban/includes/thuoc388.php?trimStart=2000&rulerLength=1000',
      segments: [
        { name: 'Tài', isRed: false },
        { name: 'Bệnh', isRed: true },
        { name: 'Ly', isRed: false },
        { name: 'Nghèo', isRed: true },
        { name: 'Quan', isRed: false },
        { name: 'Thê', isRed: true },
        { name: 'Tử', isRed: false },
        { name: 'Súc', isRed: true }
      ]
    }
  ];

  ngOnInit() {
    this.updateRulerPosition(0);
    fromEvent(this.rulerContainer.nativeElement, 'scroll')
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.updateVisibleRulers();
      });
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX - this.rulerPosition;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const newPosition = event.clientX - this.startX;
    this.lastDelta = newPosition - this.rulerPosition;
    this.updateRulerPosition(newPosition);
    event.preventDefault();
  }

  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      const velocity = this.lastDelta * 2; // Adjust this multiplier to change the scroll speed
      this.smoothScrollWithMomentum(this.rulerPosition, velocity);
    }
  }

  onMouseLeave(): void {
    this.onMouseUp();
  }

  smoothScrollWithMomentum(startPosition: number, initialVelocity: number): void {
    let currentPosition = startPosition;
    let velocity = initialVelocity;
    const deceleration = 0.95; // Adjust this value to change how quickly the scrolling slows down

    const animate = () => {
      velocity *= deceleration;
      currentPosition += velocity;

      if (Math.abs(velocity) > 0.5) {
        this.updateRulerPosition(currentPosition);
        requestAnimationFrame(animate);
      } else {
        this.snapToNearestMM();
      }
    };

    requestAnimationFrame(animate);
  }


  snapToNearestMM(): void {
    const nearestMM = Math.round(this.rulerPosition / 10) * 10;
    this.smoothScrollTo(nearestMM);
  }

  smoothScrollTo(targetPosition: number): void {
    const startPosition = this.rulerPosition;
    const distance = targetPosition - startPosition;
    const duration = 300; // ms
    const start = performance.now();

    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = this.easeOutCubic(progress);

      this.updateRulerPosition(startPosition + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  updateRulerPosition(position: number): void {
    const containerWidth = this.rulerContainer.nativeElement.offsetWidth;
    const rulerWidth = 5220; // 522cm * 10px/cm
    const maxPosition = rulerWidth - containerWidth;
    this.rulerPosition = Math.max(0, Math.min(position, maxPosition));
    this.rulerValue = 1140 + Math.round(this.rulerPosition / 10);
    this.updateRulerImages();
    requestAnimationFrame(() => {
      this.rulerContainer.nativeElement.scrollLeft = this.rulerPosition;
    });
  }

  updateRulerImages(): void {
    this.rulers.forEach(ruler => {
      ruler.image = "https://kaizenarchi.vn/wp-content/plugins/devvn-thuoc-lo-ban/includes/thuoc429.php?trimStart=2000&rulerLength=1000";
    });

    // Thêm kiểm tra lỗi khi tải hình ảnh
    this.rulers.forEach(ruler => {
      const img = new Image();
      img.onerror = () => {
        console.error(`Failed to load image: ${ruler.image}`);
        // Xử lý lỗi ở đây, ví dụ: hiển thị hình ảnh placeholder
        ruler.image = 'path/to/placeholder-image.jpg';
      };
      img.src = ruler.image;
    });
  }

  onInputChange(): void {
    this.rulerPosition = (this.rulerValue - 1140) * 10;
    this.updateRulerImages();
  }

  getCurrentSegment(ruler: any): string {
    const segmentWidth = 522 / 8; // 8 segments in total
    const currentPosition = (this.rulerValue - 1140) % 522;
    const segmentIndex = Math.floor(currentPosition / segmentWidth);
    return ruler.segments[segmentIndex].name;
  }

  getSegmentClass(segment: any): string {
    return segment.isRed ? 'text-red-500' : 'text-green-500';
  }

  updateVisibleRulers() {
    // Logic để xác định và cập nhật chỉ những thước đang hiển thị
  }
}
