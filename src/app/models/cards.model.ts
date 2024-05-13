import { List } from './list.model';

export interface Card {
  id: string;
  title: string;
  position: number;
  list: List;
  description?: string;
}

export interface CreateCardDto extends Omit<Card, 'id' | 'list'> {
  listId: string | number;
  boardId: string;
}

export interface UpdateCardDto extends Partial<Omit<Card, 'id' | 'list'>> {
  listId?: number | string;
  boardId?: string;
}
