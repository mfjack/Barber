'use client';

import { Booking } from '@prisma/client';

interface BookingListProps {
	booking: Booking;
}

const BookingList = ({ booking }: BookingListProps) => {
	return (
		<>
			<h1>Agendamentos</h1>
		</>
	);
};

export default BookingList;
