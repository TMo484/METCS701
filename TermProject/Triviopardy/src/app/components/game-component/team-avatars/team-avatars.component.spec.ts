import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAvatarsComponent } from './team-avatars.component';

describe('TeamAvatarsComponent', () => {
  let component: TeamAvatarsComponent;
  let fixture: ComponentFixture<TeamAvatarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAvatarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
