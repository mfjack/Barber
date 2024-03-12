import { ptBR } from "date-fns/locale";
import { Header } from "../components/header";
import { format } from "date-fns";
import Search from "./component/search";
import BookingItem from "../components/bookingItem";
import { db } from "../lib/prisma";
import BarbershopItem from "./component/barbershopItem";

const Home = async () => {
	const barbershops = await db.barbershop.findMany({});

	return (
		<>
			<Header />

			<div className="px-5 pt-5">
				<h2 className="text-xl font-bold">Olá Jack!</h2>
				<p className="capitalize text-sm">	
					{format(new Date(), "EEEE',' dd ' de 'MMMM", { locale: ptBR })}
				</p>
			</div>

			<div className="px-5 mt-6">
				<Search />
			</div>

			<div className="px-5 mt-6">
				<h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
				<BookingItem />
			</div>

			<div className="mt-6">
				<h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
				<div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
					{barbershops.map((barbershop) => (
						<BarbershopItem key={barbershop.id} barbershop={barbershop} />
					))}
				</div>
			</div>

			<div className="mt-6">
				<h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">Populares</h2>
				<div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
					{barbershops.map((barbershop) => (
						<BarbershopItem key={barbershop.id} barbershop={barbershop} />
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
