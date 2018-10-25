import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksampleconsultationComponent } from './booksampleconsultation.component';

describe('BooksampleconsultationComponent', () => {
  let component: BooksampleconsultationComponent;
  let fixture: ComponentFixture<BooksampleconsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksampleconsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksampleconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
