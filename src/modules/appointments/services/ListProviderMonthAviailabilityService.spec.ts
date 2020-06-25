// import AppError from '@shared/errors/AppError';
import ListProviderMonthAviailabilityService from './ListProviderMonthAviailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAviailability: ListProviderMonthAviailabilityService;

describe('ListProviderMonthAviailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAviailability = new ListProviderMonthAviailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list thr month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAviailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { available: false, day: 1 },
        { available: false, day: 2 },
        { available: false, day: 3 },
        { available: false, day: 4 },
        { available: false, day: 5 },
        { available: false, day: 6 },
        { available: false, day: 7 },
        { available: false, day: 8 },
        { available: false, day: 9 },
        { available: false, day: 10 },
        { available: false, day: 11 },
        { available: false, day: 12 },
        { available: false, day: 13 },
        { available: false, day: 14 },
        { available: false, day: 15 },
        { available: false, day: 16 },
        { available: false, day: 17 },
        { available: false, day: 18 },
        { available: false, day: 19 },
        { available: false, day: 20 },
        { available: false, day: 21 },
        { available: false, day: 22 },
        { available: false, day: 23 },
        { available: false, day: 24 },
        { available: false, day: 25 },
        { available: false, day: 26 },
        { available: false, day: 27 },
        { available: false, day: 28 },
        { available: false, day: 29 },
        { available: false, day: 30 },
        { available: false, day: 31 },
      ]),
    );
  });
});
