import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaitingStarComponent } from './raiting-star.component';

describe('RaitingStarComponent', () => {
  let component: RaitingStarComponent;
  let fixture: ComponentFixture<RaitingStarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaitingStarComponent]
    });
    fixture = TestBed.createComponent(RaitingStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
