import { User } from './user.model';
import { Colors } from '@models/colors.models';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
}
