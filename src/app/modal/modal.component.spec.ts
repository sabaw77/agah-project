import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = fixture.nativeElement;
    component.inputForm = [
      {
        formControlName: 'name',
        type: 'textBox',
        label: 'name',
        validation: 'required',
        placeHolder: 'Adam',
      }, {
        formControlName: 'status',
        label: 'Status',
        validation: 'required',
        type: 'radio',
        radioButtons: ['active', 'inactive']
      }
    ]
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const nameInput = element.querySelector('input[id="name"]');
    const radioButton = element.querySelector('input[id="status"]');

    expect(radioButton).toBeTruthy();
    expect(nameInput).toBeTruthy();
  });

  it('should test form validity', () => {
    const form = component.formGroup;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    nameInput.setValue('Adam');
    const radioButton = form.controls.status;
    radioButton.setValue('inactive');

    expect(form.valid).toBeTruthy();
  })

  it('should test input errors', () => {
    const nameInput = component.formGroup.controls.name;
    const radioButton = component.formGroup.controls.status;

    expect(nameInput.errors.required).toBeTruthy();
    expect(radioButton.errors.required).toBeTruthy();

    nameInput.setValue('Adam');
    expect(nameInput.errors).toBeNull();

    radioButton.setValue('inactive');
    expect(radioButton.errors).toBeNull();
  });

  it('should emit hideModal event', () => {
    spyOn(component.hideModal, 'emit');
    component.closeModal()
    expect(component.hideModal.emit).toHaveBeenCalled();
  })
  it('should setErrors(emptyField) for formGroup when formGroup is invalid and called onSubmit()', () => {
    const form = component.formGroup;
    expect(form.invalid).toBeTruthy();
    component.onSubmit();
    expect(form.hasError('emptyField')).toBeTruthy();
  })

  it('should raise formData event when called onSubmit()', () => {
    const form = component.formGroup;
    form.controls.name.setValue('Adam');
    form.controls.status.setValue('inactive');
    expect(form.valid).toBeTruthy();
    expect(form.get('companyId')).toBeNull();
    component.onSubmit();
    component.formData.subscribe(val => {
      expect(val).toBe(form.value)
    })
  })
});
