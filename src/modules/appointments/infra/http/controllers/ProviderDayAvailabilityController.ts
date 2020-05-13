import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAviailabilityService from '@modules/appointments/services/ListProviderDayAviailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAviailability = container.resolve(
      ListProviderDayAviailabilityService,
    );

    const availability = await listProviderDayAviailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
