// import AppError from '@shared/errors/AppError';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments.', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointmentThree = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      day: 20,
      month: 5,
      year: 2020,
      provider_id: 'provider_id',
    });

    expect(appointments).toStrictEqual([
      appointmentOne,
      appointmentTwo,
      appointmentThree,
    ]);
  });
});
