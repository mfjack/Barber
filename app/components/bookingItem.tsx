import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
	return (
		<Card>
			<CardContent className="p-5 flex justify-between">
				<div className="flex flex-col gap-2">
					<Badge className="bg-[#221c3d] text-primary hover:bg-[#221c3d] w-fit">
						Confirmado
					</Badge>

					<h2 className="font-bold">Corte de Cabelo</h2>

					<div className="flex items-center gap-2">
						<Avatar className="h-6 w-6">
							<AvatarImage src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png" />
							<AvatarFallback>A</AvatarFallback>
						</Avatar>

						<h3 className="text-sm">Vintage Barber</h3>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-5">
					<p className="text-sm">Novembro</p>
					<p className="text-2xl ">06</p>
					<p className="text-sm">08h00</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default BookingItem;
