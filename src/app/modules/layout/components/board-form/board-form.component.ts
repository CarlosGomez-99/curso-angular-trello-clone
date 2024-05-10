import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { BoardsService } from '@services/boards.service';
import { BoardCreate } from '@models/board.model';
import { Colors } from '@models/colors.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
})
export class BoardFormComponent {
  faCheck = faCheck;

  form = this.FormBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private FormBuilder: FormBuilder,
    private BoardsService: BoardsService,
    private router: Router
  ) {}

  doSave() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.value;
      let boardCreate = { title, backgroundColor } as BoardCreate;
      this.BoardsService.createBoard(boardCreate).subscribe((board) => {
        console.log('board', board);
        this.router.navigate(['/app/boards', board.id]);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
