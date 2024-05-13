import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { BoardsService } from '@services/boards.service';

import { Board } from '@models/board.model';
import { Card } from '@models/cards.model';
import { CardsService } from '@services/cards.service';
import { List } from '@models/list.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  board: Board | null = null;
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  faClose = faClose;

  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private cardsService: CardsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const str = this.boardsService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const card = event.container.data[event.currentIndex];
    const listId = event.container.id;
    this.updateCard(card.id, str, listId);
  }

  addColumn() {
    // this.columns.push({
    //   title: 'New Column',
    //   todos: [],
    // });
  }

  openDialog(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card,
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) {
        console.log(output);
      }
    });
  }

  private getBoard(id: string) {
    this.boardsService.getBoard(id).subscribe((board) => {
      console.log(board);

      this.board = board;
    });
  }

  private updateCard(
    id: Card['id'],
    position: number,
    listId: number | string
  ) {
    this.cardsService.updateCard(id, { position, listId }).subscribe((card) => {
      console.log(card);
    });
  }

  openCardForm(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board?.lists.map((listD) => ({
        ...listD,
        showCardForm: listD.id === list.id,
      }));
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    if (title) {
      if (this.board) {
        const boardId = this.board.id;
        const listId = list.id;
        const position = this.boardsService.getPositionForNewCard(list.cards);
        this.cardsService
          .createCard({
            title,
            listId,
            boardId,
            position,
          })
          .subscribe((card) => {
            this.getBoard(boardId);
            this.inputCard.reset();
            list.showCardForm = false;
          });
      }
    }
  }

  closeCardForm(list: List) {
    if (this.board?.lists) {
      this.board.lists = this.board?.lists.map((listD) => ({
        ...listD,
        showCardForm: false,
      }));
    }
  }
}
