import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechungtoiComponent } from './vechungtoi.component';

describe('VechungtoiComponent', () => {
  let component: VechungtoiComponent;
  let fixture: ComponentFixture<VechungtoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VechungtoiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VechungtoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
