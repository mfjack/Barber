"use client";

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { Card, CardContent } from "@/app/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/app/components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../helpers/hours";

interface ServiceItemProps {
	barbershop: Barbershop;
	service: Service;
	isAuthenticated?: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [hour, setHour] = useState<string | undefined>();

	const handleDateClick = (date: Date | undefined) => {
		setDate(date);
		setHour(undefined);
	};

	const handleHourClick = (time: string) => {
		setHour(time);
	};

	const handleBookingClick = () => {
		if (!isAuthenticated) {
			return signIn("google");
		}
	};

	const timeList = useMemo(() => {
		return date ? generateDayTimeList(date) : [];
	}, [date]);

	return (
		<Card>
			<CardContent className="p-3 w-full">
				<div className="flex gap-4 items-center w-full">
					<div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
						<Image
							className="rounded-lg"
							src={service.imageUrl}
							alt={service.name}
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>

					<div className="flex flex-col w-full">
						<h2 className="font-bold text-sm">{service.name}</h2>
						<p className="text-sm text-gray-400">{service.description}</p>

						<div className="flex items-center justify-between mt-3">
							<p className="text-primary text-sm font-bold">
								{Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL",
								}).format(Number(service.price))}
							</p>
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="secondary" onClick={handleBookingClick}>
										Reservar
									</Button>
								</SheetTrigger>
								<SheetContent className="p-0">
									<SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
										<SheetTitle>Fazer Reserva</SheetTitle>
									</SheetHeader>

									<Calendar
										mode="single"
										selected={date}
										onSelect={handleDateClick}
										locale={ptBR}
										fromDate={new Date()}
									/>

									{/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
									{date && (
										<div className="flex gap-3 px-3 py-5 overflow-x-auto [&::-webkit-scrollbar]:hidden border-t border-solid border-secondary">
											{timeList.map((time) => (
												<Button
													className="w-full rounded-full"
													variant={hour === time ? "default" : "outline"}
													key={time}
													onClick={() => handleHourClick(time)}
												>
													{time}
												</Button>
											))}
										</div>
									)}

									<div className="py-6 px-5 border-t border-solid border-secondary">
										<Card>
											<CardContent className="p-3 flex flex-col gap-3">
												<div className="flex justify-between">
													<h2 className="font-bold text-sm">{service.name}</h2>
													<h3 className="text-primary text-sm font-bold">
														{Intl.NumberFormat("pt-BR", {
															style: "currency",
															currency: "BRL",
														}).format(Number(service.price))}
													</h3>
												</div>

												{date && (
													<div className="flex justify-between">
														<h3 className="text-gay-400 text-sm">Data</h3>
														<h4 className="text-sm">{date.toLocaleDateString("pt-BR")}</h4>
													</div>
												)}

												{hour && (
													<div className="flex justify-between">
														<h3 className="text-gay-400 text-sm">Hora</h3>
														<h4 className="text-sm">{hour}</h4>
													</div>
												)}

												<div className="flex justify-between">
													<h3 className="text-gay-400 text-sm">Barbearia</h3>
													<h4 className="text-sm">{barbershop.name}</h4>
												</div>
											</CardContent>
										</Card>

										<SheetFooter className="mt-5">
											<Button className="w-full" disabled={!date || !hour}>
												Confirmar reserva
											</Button>
										</SheetFooter>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ServiceItem;
