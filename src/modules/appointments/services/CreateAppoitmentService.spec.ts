import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppoitmentService from './CreateAppoitmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppoitmentService: CreateAppoitmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppoitment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppoitmentService = new CreateAppoitmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppoitmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '122848184891658sd4f',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment?.provider_id).toBe('122848184891658sd4f');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 6, 11, 20);

    await createAppoitmentService.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123123123',
    });

    await expect(
      createAppoitmentService.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitmentService.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitmentService.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoitmentService.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: '123123',
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppoitmentService.execute({
        date: new Date(2020, 4, 10, 18),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
