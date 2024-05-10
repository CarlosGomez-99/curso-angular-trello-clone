import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  faCheck = faCheck;

  form = this.FormBuilder.group({
    title: [''],
    backgroundColor: [''],
  });

  constructor(private FormBuilder: FormBuilder) {}

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.getRawValue();
      console.log({ title, backgroundColor });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
