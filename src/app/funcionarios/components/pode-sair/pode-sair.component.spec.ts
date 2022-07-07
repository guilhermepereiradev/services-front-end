import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodeSairComponent } from './pode-sair.component';

describe('PodeSairComponent', () => {
  let component: PodeSairComponent;
  let fixture: ComponentFixture<PodeSairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodeSairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodeSairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
