'use client';

import { Prisma } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { format, isFuture } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';
import Image from 'next/image';
import { Button } from './ui/button';
import { cancelBooking } from '../_actions/cancelBooking';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface BookingItemProps {
	booking: Prisma.BookingGetPayload<{
		include: {
			service: true;
			barbershop: true;
		};
	}>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
	const isBookingConfirmed = isFuture(booking.date);
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	const handleCancelClick = async () => {
		setIsDeleteLoading(true);
		try {
			await cancelBooking(booking.id);

			toast('Agendamento cancelado com sucesso!', {});
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleteLoading(false);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Card className='min-w-full '>
					<CardContent className='flex px-0 py-0'>
						<div className='flex flex-col gap-2 py-5 flex-[3] pl-5'>
							<Badge
								className='w-fit'
								variant={isBookingConfirmed ? 'secondary' : 'default'}
							>
								{isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
							</Badge>

							<h2 className='font-bold'>{booking.service.name}</h2>

							<div className='flex items-center gap-2'>
								<Avatar className='h-8 w-8'>
									<AvatarImage src={booking.barbershop.imageUrl} />
									<AvatarFallback>A</AvatarFallback>
								</Avatar>

								<h3 className='text-sm'>{booking.barbershop.name}</h3>
							</div>
						</div>

						<div className='flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary'>
							<p className='text-sm capitalize'>
								{format(booking.date, 'MMMM', {
									locale: ptBR,
								})}
							</p>
							<p className='text-2xl'>{format(booking.date, 'dd')}</p>
							<p className='text-sm'>{format(booking.date, 'hh:mm')}</p>
						</div>
					</CardContent>
				</Card>
			</SheetTrigger>

			<SheetContent className='px-0'>
				<SheetHeader className='px-5 text-left pb-6 border-b border-solid border-secondary'>
					<SheetTitle>Informações da Reserva</SheetTitle>
				</SheetHeader>

				<div className='px-5'>
					<div className='relative h-[180px] w-full mt-6'>
						<Image
							src='/barbershopcard.svg'
							alt={booking.barbershop.name}
							fill
							style={{ objectFit: 'contain' }}
						/>

						<div className='w-full px-5 absolute bottom-4'>
							<Card>
								<CardContent className='flex items-center p-3 gap-3'>
									<Avatar className='h-10 w-10'>
										<AvatarImage src={booking.barbershop.imageUrl} />
										<AvatarFallback>A</AvatarFallback>
									</Avatar>

									<div>
										<h2 className='fotn-bold'>{booking.barbershop.name}</h2>
										<h3 className='text-xs overflow-hidden text-nowrap text-ellipsis'>
											{booking.barbershop.address}
										</h3>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<Badge
						className='w-fit mt-5 my-6'
						variant={isBookingConfirmed ? 'default' : 'secondary'}
					>
						{isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
					</Badge>

					<Card>
						<CardContent className='p-3 flex flex-col gap-3'>
							<div className='flex justify-between'>
								<h2 className='font-bold text-sm'>{booking.service.name}</h2>
								<h3 className='text-primary text-sm font-bold'>
									{Intl.NumberFormat('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									}).format(Number(booking.service.price))}
								</h3>
							</div>

							<div className='flex justify-between'>
								<h3 className='text-gay-400 text-sm'>Data</h3>
								<h4 className='text-sm'>
									{booking.date.toLocaleDateString('pt-BR')}
								</h4>
							</div>

							<div className='flex justify-between'>
								<h3 className='text-gay-400 text-sm'>Hora</h3>
								<h4 className='text-sm'>{format(booking.date, 'hh:mm')}</h4>
							</div>

							<div className='flex justify-between'>
								<h3 className='text-gay-400 text-sm'>Barbearia</h3>
								<h4 className='text-sm'>{booking.barbershop.name}</h4>
							</div>
						</CardContent>
					</Card>

					<SheetFooter className='flex-row gap-2 mt-6'>
						<SheetClose asChild>
							<Button
								className='w-full'
								variant='secondary'
							>
								Voltar
							</Button>
						</SheetClose>
						<Button
							onClick={handleCancelClick}
							disabled={!isBookingConfirmed || isDeleteLoading}
							className='w-full'
							variant='destructive'
						>
							{isDeleteLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : null}
							Cancelar Reserva
						</Button>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default BookingItem;
