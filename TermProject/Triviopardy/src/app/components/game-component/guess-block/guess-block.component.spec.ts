import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessBlockComponent } from './guess-block.component';

describe('GuessBlockComponent', () => {
  let component: GuessBlockComponent;
  let fixture: ComponentFixture<GuessBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
