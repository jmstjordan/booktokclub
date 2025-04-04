import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpButtonComponent } from './sign-up-button.component';

describe('SignUpButtonComponent', () => {
  let component: SignUpButtonComponent;
  let fixture: ComponentFixture<SignUpButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
