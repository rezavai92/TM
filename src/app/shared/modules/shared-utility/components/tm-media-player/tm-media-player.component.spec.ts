import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmMediaPlayerComponent } from './tm-media-player.component';

describe('TmMediaPlayerComponent', () => {
  let component: TmMediaPlayerComponent;
  let fixture: ComponentFixture<TmMediaPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmMediaPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmMediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
