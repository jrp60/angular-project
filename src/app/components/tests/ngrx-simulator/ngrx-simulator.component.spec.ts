import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSimulatorComponent } from './ngrx-simulator.component';

describe('NgrxSimulatorComponent', () => {
  let component: NgrxSimulatorComponent;
  let fixture: ComponentFixture<NgrxSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
