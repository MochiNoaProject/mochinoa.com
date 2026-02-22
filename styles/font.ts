import localFont from "next/font/local";

export const irohamaruMikami = localFont({
	src: [
		{
			path: "../public/fonts/irohamaru-mikami-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/irohamaru-mikami-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/irohamaru-mikami-Medium.ttf",
			weight: "500",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-irohamaru",
});
