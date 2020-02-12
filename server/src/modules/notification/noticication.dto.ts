import { User } from '../user/user.entity';

export class NotificationDto {
  readonly content: string;
  readonly send_uid: User;
  readonly receive_uid: User;

  readonly type: string;
}
