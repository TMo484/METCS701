import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBlockComponent } from './answer-block.component';

describe('AnswerBlockComponent', () => {
  let component: AnswerBlockComponent;
  let fixture: ComponentFixture<AnswerBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
