import { ptBR } from 'date-fns/locale';
import { Header } from '../components/header';
import { format } from 'date-fns';
import Search from './component/search';
import BookingItem from '../components/bookingItem';
import { db } from '../_lib/prisma';
import BarbershopItem from './component/barbershopItem';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const Home = async () => {
	const session = await getServerSession(authOptions);

	const [barbershops, confirmedBookings] = await Promise.all([
		db.barbershop.findMany({}),
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
				<h2 className='text-xl font-bold'>Olá</h2>
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
						<h2 className='pl-5 text-xs uppercase text-gray-400 font-bold mb-3'>
							Agendamentos
						</h2>

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
				<h2 className='text-xs px-5 uppercase text-gray-400 font-bold mb-3'>
					Recomendados
				</h2>
				<div className='flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{barbershops.map(barbershop => (
						<BarbershopItem
							key={barbershop.id}
							barbershop={barbershop}
						/>
					))}
				</div>
			</div>

			<div className='mt-6'>
				<h2 className='text-xs px-5 uppercase text-gray-400 font-bold mb-3'>Populares</h2>
				<div className='flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
					{barbershops.map(barbershop => (
						<BarbershopItem
							key={barbershop.id}
							barbershop={barbershop}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
