import { Card } from './cards.model';
import { List } from './list.model';
import { User } from './user.model';
import { Colors } from '@models/colors.models';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
  lists: List[];
  cards: Card[];
}
