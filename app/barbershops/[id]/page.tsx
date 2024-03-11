import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./components/barbershopInfo";
import ServiceItem from "./components/serviceItem";

interface BarbershopDetailsPageProps {
	params: {
		id?: string;
	};
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
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

			<div className="px-5 flex flex-col gap-3 py-6">
				{barbershop.services.map((service) => (
					<ServiceItem key={service.id} service={service} />
				))}
			</div>
		</div>
	);
};

export default BarbershopDetailsPage;
