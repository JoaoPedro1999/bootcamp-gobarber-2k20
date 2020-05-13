import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAviailabilityService from '@modules/appointments/services/ListProviderMonthAviailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAviailability = container.resolve(
      ListProviderMonthAviailabilityService,
    );

    const availability = await listProviderMonthAviailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
