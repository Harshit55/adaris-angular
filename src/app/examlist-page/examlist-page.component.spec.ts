import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamlistPageComponent } from './examlist-page.component';

describe('ExamlistPageComponent', () => {
  let component: ExamlistPageComponent;
  let fixture: ComponentFixture<ExamlistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamlistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
