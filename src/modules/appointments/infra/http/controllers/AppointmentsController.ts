import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppoitmentService from '@modules/appointments/services/CreateAppoitmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppoitmentService = container.resolve(CreateAppoitmentService);

    const appointment = await createAppoitmentService.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}
