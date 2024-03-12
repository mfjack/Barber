"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./sideMenu";

export const Header = () => {
	return (
		<Card>
			<CardContent className="p-5 flex justify-between flex-row items-center">
				<Image src="/logo.svg" alt="Logo" width={120} height={22} />
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size={"icon"}>
							<MenuIcon size={16} />
						</Button>
					</SheetTrigger>

					<SheetContent className="p-0">
						<SideMenu />
					</SheetContent>
				</Sheet>
			</CardContent>
		</Card>
	);
};
