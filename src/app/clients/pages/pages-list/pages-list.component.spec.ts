import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesListComponent } from './pages-list.component';

describe('PagesListComponent', () => {
  let component: PagesListComponent;
  let fixture: ComponentFixture<PagesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagesListComponent]
    });
    fixture = TestBed.createComponent(PagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
