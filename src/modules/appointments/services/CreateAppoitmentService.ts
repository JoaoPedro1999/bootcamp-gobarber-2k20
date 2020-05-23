import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Appointment from '../infra/typeorm/entities/Appointments';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppoitmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment | null> {
    const appointmentDate = startOfHour(date);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create an appointment between 8am and 5pm',
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    // Paremetros Nomeados
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formatDate = format(
      appointmentDate,
      "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
      { locale: ptBR },
    );

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${formatDate}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppoitmentService;
