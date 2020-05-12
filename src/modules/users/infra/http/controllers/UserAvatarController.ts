import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class SessionsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { filename } = request.file;
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename: filename,
    });

    delete user.password;

    return response.json(user);
  }
}
