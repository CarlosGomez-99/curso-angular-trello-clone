import { Board, BoardCreate } from '@models/board.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Card } from '@models/cards.model';
import { List } from '@models/list.model';
import { BehaviorSubject } from 'rxjs';
import { Colors } from '@models/colors.models';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  apiUrl = environment.API_URL;
  bufferSpace = 65535;
  backgroundColor$ = new BehaviorSubject<Colors>('sky');

  constructor(private http: HttpClient) {}

  getBoard(id: Board['id']) {
    return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
      context: checkToken(),
    });
  }

  createBoard(boardCreate: BoardCreate) {
    return this.http.post<Board>(`${this.apiUrl}/api/v1/boards`, boardCreate, {
      context: checkToken(),
    });
  }

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }

    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position / 2;
      return onTopPosition;
    }

    const lastIndexOfArray = cards.length - 1;

    if (
      cards.length > 2 &&
      currentIndex > 0 &&
      currentIndex < lastIndexOfArray
    ) {
      const previousCardPosition = cards[currentIndex - 1].position;
      const nextCardPosition = cards[currentIndex + 1].position;
      const middlePosition = (previousCardPosition + nextCardPosition) / 2;
      return middlePosition;
    }

    if (currentIndex === lastIndexOfArray) {
      const onBottomPosition =
        cards[currentIndex - 1].position + this.bufferSpace;
      return onBottomPosition;
    }

    return 0;
  }

  getPositionForNewItem(elements: Card[] | List[]) {
    if (elements.length === 0) {
      return this.bufferSpace;
    }

    const lastIndexOfArray = elements.length - 1;
    const onBottomPosition =
      elements[lastIndexOfArray].position + this.bufferSpace;
    return onBottomPosition;
  }

  setBoardBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color);
  }
}
