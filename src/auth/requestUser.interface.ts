import { Request } from 'express';
import User from '../users/users.entity';

interface RequestUser extends Request {
  user: User;
}

export default RequestUser;
