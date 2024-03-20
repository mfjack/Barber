import { db } from '@/app/_lib/prisma';
import BarbershopInfo from './components/barbershopInfo';
import ServiceItem from './components/serviceItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';

interface BarbershopDetailsPageProps {
	params: {
		id?: string;
	};
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
	const session = await getServerSession(authOptions);
	if (!params.id) {
		return null;
	}

	const barbershop = await db.barbershop.findUnique({
		where: {
			id: params.id,
		},
		include: {
			services: true,
		},
	});

	if (!barbershop) {
		return null;
	}

	return (
		<div>
			<BarbershopInfo barbershop={barbershop} />

			<div className='px-5 flex flex-col gap-3 py-6'>
				{barbershop.services.map(service => (
					<ServiceItem
						key={service.id}
						barbershop={barbershop}
						service={service}
						isAuthenticated={!!session?.user}
					/>
				))}
			</div>
		</div>
	);
};

export default BarbershopDetailsPage;
