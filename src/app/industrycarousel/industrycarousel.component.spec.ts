import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrycarouselComponent } from './industrycarousel.component';

describe('IndustrycarouselComponent', () => {
  let component: IndustrycarouselComponent;
  let fixture: ComponentFixture<IndustrycarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrycarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrycarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
