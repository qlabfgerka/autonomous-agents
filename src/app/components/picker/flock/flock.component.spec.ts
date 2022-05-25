import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlockComponent } from './flock.component';

describe('FlockComponent', () => {
  let component: FlockComponent;
  let fixture: ComponentFixture<FlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
