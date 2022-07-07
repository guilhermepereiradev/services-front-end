import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvandoFuncionarioComponent } from './salvando-funcionario.component';

describe('SalvandoFuncionarioComponent', () => {
  let component: SalvandoFuncionarioComponent;
  let fixture: ComponentFixture<SalvandoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalvandoFuncionarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalvandoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
