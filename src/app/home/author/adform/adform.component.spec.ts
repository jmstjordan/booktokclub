import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdformComponent } from './adform.component';

describe('AdformComponent', () => {
  let component: AdformComponent;
  let fixture: ComponentFixture<AdformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
