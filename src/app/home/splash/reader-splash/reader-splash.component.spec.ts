import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderSplashComponent } from './reader-splash.component';

describe('ReaderSplashComponent', () => {
  let component: ReaderSplashComponent;
  let fixture: ComponentFixture<ReaderSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderSplashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
