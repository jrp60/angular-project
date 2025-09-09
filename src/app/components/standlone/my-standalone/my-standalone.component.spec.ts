import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStandaloneComponent } from './my-standalone.component';

describe('MyStandaloneComponent', () => {
  let component: MyStandaloneComponent;
  let fixture: ComponentFixture<MyStandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyStandaloneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
