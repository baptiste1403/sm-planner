import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { FormsService } from 'src/app/services/forms.service';
import { requiredFileType } from 'src/app/validators/requiredFileTypeValidator';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent {
  isEdit: boolean = false;
  postPath: string | undefined;

  @Output() onPopupClose: EventEmitter<void> = new EventEmitter();

  addForm = this.fb.group({
    date: ['', [Validators.required]],
    name: ['', [Validators.required]],
    state: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
    files: ['', [Validators.required, requiredFileType(['png', 'jpeg', 'mp4'])]]
  });

  constructor(private fb: FormBuilder, private api: ApiService,
    private forms: FormsService) { }

  onSubmit() {
    console.log(this.addForm.getRawValue());
    this.api.savePost(this.addForm);
    this.addForm.reset();
    this.onPopupClose.emit();
    this.isEdit = false;
  }

  onClickDelete() {
    this.api.delFiles(this.addForm.get('date')?.getRawValue(), this.addForm.get('name')?.getRawValue()).subscribe();
    this.onPopupClose.emit()
    this.isEdit = false;
  }

  onClickShowFiles() {
    this.api.showFiles(this.addForm.get('date')?.getRawValue(), this.addForm.get('name')?.getRawValue()).subscribe();
  }

  onClickCancel() {
    this.onPopupClose.emit();
    this.isEdit = false;
  }

  getStates() {
    return this.forms.getStates();
  }

  getTypes() {
    return this.forms.getTypes();
  }

  prepareForEdit(model: any) {
    console.log("edit : ", model);
    this.addForm.setValue({
      date: model.date,
      name: model.name,
      state: model.state,
      type: model.type,
      description: model.description,
      files: ""
    });

    this.addForm.get('date')?.disable();
    this.addForm.get('name')?.disable();
    this.addForm.get('files')?.disable();
    this.isEdit = true;
  }
}