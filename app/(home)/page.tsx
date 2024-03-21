import { ptBR } from 'date-fns/locale';
import { Header } from '../_components/header';
import { format } from 'date-fns';
import Search from './component/search';
import BookingItem from '../_components/bookingItem';
import { db } from '../_lib/prisma';
import BarbershopItem from './component/barbershopItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

const Home = async () => {
	const session = await getServerSession(authOptions);

	const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
		db.barbershop.findMany({}),
		db.barbershop.findMany({
			orderBy: {
				id: 'asc',
			},
		}),
		session?.user
			? db.booking.findMany({
					where: {
						userId: (session.user as any).id,
						date: {
							gte: new Date(),
						},
					},
					include: {
						service: true,
						barbershop: true,
					},
			  })
			: Promise.resolve([]),
	]);

	return (
		<>
			<Header />

			<div className='px-5 pt-5'>
				<h2 className='text-xl font-bold'>
					{session?.user
						? `Olá, ${session.user.name?.split(' ')[0]}`
						: 'Olá! Vamos agendar um corte hoje?'}
				</h2>
				<p className='capitalize text-sm'>
					{format(new Date(), "EEEE',' dd ' de 'MMMM", { locale: ptBR })}
				</p>
			</div>

			<div className='px-5 mt-6'>
				<Search />
			</div>

			<div className='mt-6'>
				{confirmedBookings.length > 0 && (
					<>
						<h2 className='pl-5 text-xs uppercase text-gray-400 font-bold mb-3'>Agendamentos</h2>

						<div className='pl-5 flex px-5 gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
							{confirmedBookings.map(booking => (
								<BookingItem
									key={booking.id}
									booking={booking}
								/>
							))}
						</div>
					</>
				)}
			</div>

			<div className='mt-6'>
				<h2 className='text-xs px-5 uppercase text-gray-400 font-bold mb-3'>Recomendados</h2>
				<div className='flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{barbershops.map(barbershop => (
						<div
							key={barbershop.id}
							className='min-w-[167px] max-w-[167px]'
						>
							<BarbershopItem barbershop={barbershop} />
						</div>
					))}
				</div>
			</div>

			<div className='mt-6'>
				<h2 className='text-xs px-5 uppercase text-gray-400 font-bold mb-3'>Populares</h2>
				<div className='flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{recommendedBarbershops.map(barbershop => (
						<div
							key={barbershop.id}
							className='min-w-[167px] max-w-[167px]'
						>
							<BarbershopItem barbershop={barbershop} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
