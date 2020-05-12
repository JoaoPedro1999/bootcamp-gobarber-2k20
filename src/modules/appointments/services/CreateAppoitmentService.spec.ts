import AppError from '@shared/errors/AppError';
import CreateAppoitmentService from './CreateAppoitmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRespository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppoitmentService: CreateAppoitmentService;

describe('CreateAppoitment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppoitmentService = new CreateAppoitmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppoitmentService.execute({
      date: new Date(),
      provider_id: '122848184891658sd4f',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment?.provider_id).toBe('122848184891658sd4f');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 6, 11, 20);

    await createAppoitmentService.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    expect(
      createAppoitmentService.execute({
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
