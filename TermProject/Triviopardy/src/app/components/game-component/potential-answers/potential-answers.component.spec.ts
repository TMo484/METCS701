import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialAnswersComponent } from './potential-answers.component';

describe('PotentialAnswersComponent', () => {
  let component: PotentialAnswersComponent;
  let fixture: ComponentFixture<PotentialAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
