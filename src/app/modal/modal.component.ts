import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { FormBuilderInterface } from '../interfaces/general/formBuilder.interface';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output('closeModal') hideModal = new EventEmitter<boolean>();
  @Output() formData = new EventEmitter();
  @Input() inputForm: FormBuilderInterface[];
  @Input() companyList: CompanyDataBaseSimulationInterface[];
  formGroup: FormGroup;
  constructor() {
  }

  ngOnInit(): void {
    let group = {}
    this.inputForm.forEach((inputElement: FormBuilderInterface) => {
      group[inputElement.formControlName] = new FormControl('', Validators[inputElement.validation]);
    })
    this.formGroup = new FormGroup(group);

  }

  closeModal() {
    this.hideModal.emit();
  }


  onSubmit() {
    let value = this.formGroup.value;

    if (this.formGroup.invalid) {
      this.formGroup.setErrors({
        emptyField: true,

      })

    }
    else if (this.formGroup.get('companyId')) {

      let company = this.companyList.find(company => company.id === this.formGroup.get('companyId').value);
      let index = this.companyList.indexOf(company);
      if (!company) {
        this.formGroup.setErrors({
          invalidCompanyId: true
        })
      }
      else {
        let values = {
          value,
          index
        }
        this.formData.emit(values);
        this.formGroup.reset();
      }
    }
    else {
      this.formData.emit(value);
      this.formGroup.reset();
    }
  }
}
