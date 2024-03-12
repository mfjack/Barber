"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {
	const { data } = useSession();

	const handleLogoutClick = () => signOut();

	const handleLoginClick = () => signIn();

	return (
		<>
			<SheetHeader className="text-left border-b border-solid border-secondary p-5">
				<SheetTitle>Menu</SheetTitle>
			</SheetHeader>

			{data?.user ? (
				<div className="flex items-center justify-between px-5 py-5 ">
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage className="h-12 w-12" src={data.user?.image ?? ""} />
						</Avatar>

						<h2 className="font-bold">{data.user?.name}</h2>
					</div>

					<Button variant="secondary" onClick={handleLogoutClick}>
						<LogOutIcon size={16} />
					</Button>
				</div>
			) : (
				<div className="flex items-center flex-col px-5 py-6">
					<div className="flex gap-3 px-5 py-6">
						<UserIcon size={28} />
						<h2 className="font-bold">Olá, faça seu login!</h2>
					</div>
					<Button className="w-full" variant="secondary" onClick={handleLoginClick}>
						<LogInIcon className="mr-2" size={18} />
						Fazer login
					</Button>
				</div>
			)}

			<div className="flex flex-col gap-3 px-5">
				<Button className="justify-start" variant="outline" asChild>
					<Link href="/">
						<HomeIcon className="mr-2" size={18} />
						Início
					</Link>
				</Button>

				{data?.user && (
					<Button className="justify-start" variant="outline" asChild>
						<Link href="/bookings">
							<CalendarIcon className="mr-2" size={18} />
							Agendamentos
						</Link>
					</Button>
				)}
			</div>
		</>
	);
};

export default SideMenu;
