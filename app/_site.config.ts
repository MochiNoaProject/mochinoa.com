import type { StaticImageData } from "next/image";
import lineBannerImg from "./_assets/images/LINEスタンプバナー.png";
import twitterLinkImg from "./_assets/images/TwitterLink.png";
import tshirtImg from "./_assets/images/Tシャツ.png";
import youtubeLinkImg from "./_assets/images/YouTubeLink.png";
import thumbDaisyCrown from "./_assets/images/youtube-thumbnails/DaisyCrown.webp";
import thumbEvilBubble from "./_assets/images/youtube-thumbnails/EvilBubble.webp";
import thumbInternetOverdose from "./_assets/images/youtube-thumbnails/INTERNET OVERDOSE.webp";
import thumbZutto from "./_assets/images/youtube-thumbnails/ずうっといっしょ！.jpg";
import thumbTadaKoe from "./_assets/images/youtube-thumbnails/ただ声一つ.jpg";
import thumbDakishimeru from "./_assets/images/youtube-thumbnails/だきしめるまで。.webp";
import thumbDameNingen from "./_assets/images/youtube-thumbnails/だめにんげんだ！.webp";
import thumbTotemoSuteki from "./_assets/images/youtube-thumbnails/とても素敵な六月でした.webp";
import thumbKaiko from "./_assets/images/youtube-thumbnails/カイコ.jpg";
import thumbKaguya from "./_assets/images/youtube-thumbnails/カグヤ.jpg";
import thumbSilVousPresident from "./_assets/images/youtube-thumbnails/シルヴプレジデント.webp";
import thumbTondemoWonders from "./_assets/images/youtube-thumbnails/トンデモワンダーズ.webp";
import thumbImaWa from "./_assets/images/youtube-thumbnails/今はいいんだよ。.webp";
import thumbShayo from "./_assets/images/youtube-thumbnails/斜陽.jpg";
import thumbTadashiku from "./_assets/images/youtube-thumbnails/正しくなれない.webp";
import thumbShizuku from "./_assets/images/youtube-thumbnails/雫.webp";
import thumbKakumei from "./_assets/images/youtube-thumbnails/革命道中.jpg";
import glassesImg from "./_assets/images/メガネ吹き.png";
import ytBannerImg from "./_assets/images/望月のあYouTubeバナー.jpg";

export type Song = {
	title: string;
	url: string;
	thumbnail: StaticImageData;
};

type ShopItem = {
	name: string;
	url: string;
	image: StaticImageData;
};

type Banner = {
	url: string;
	image: StaticImageData;
	alt: string;
	label: string;
};

type LinkWithImage = {
	url: string;
	image: StaticImageData;
};

export const siteConfig = {
	contact: {
		email: "mochizuki.noa.project@gmail.com",
	},
	links: {
		momomochi: "https://momomochi.mochinoa.com/",
		youtube: {
			url: "https://www.youtube.com/@MochizukiNoa",
			image: youtubeLinkImg,
		} satisfies LinkWithImage,
		twitter: {
			url: "https://x.com/_noach",
			image: twitterLinkImg,
		} satisfies LinkWithImage,
		cien: "https://ci-en.net/creator/22003",
		lineStamp: "https://store.line.me/stickershop/product/31995151/ja",
	},
	guidelines: {
		streaming: "/guidelines/streaming",
		fanart: "/guidelines/fanart",
	},
	shop: {
		top: "https://mochinoa.booth.pm/",
		items: [
			{
				name: "Tシャツ",
				url: "https://mochinoa.booth.pm/items/7339358",
				image: tshirtImg,
			},
			{
				name: "メガネ拭き",
				url: "https://mochinoa.booth.pm/items/3203325",
				image: glassesImg,
			},
		] satisfies ShopItem[],
	},
	banners: [
		{
			url: "https://www.youtube.com/@MochizukiNoa",
			image: ytBannerImg,
			alt: "望月のあ YouTube",
			label: "実写配信etc.",
		},
		{
			url: "https://store.line.me/stickershop/product/31995151/ja",
			image: lineBannerImg,
			alt: "LINEスタンプ",
			label: "LINEスタンプ販売中",
		},
	] satisfies Banner[],
	songs: [
		{
			title: "雫",
			url: "https://youtu.be/VPXeQdzbyhc?si=tz6ZXKYwO_AU_HJQ",
			thumbnail: thumbShizuku,
		},
		{
			title: "INTERNET OVERDOSE",
			url: "https://youtu.be/RU7g4KQ_k54?si=2_pRtfTFzObZjbfV",
			thumbnail: thumbInternetOverdose,
		},
		{
			title: "トンデモワンダーズ",
			url: "https://youtu.be/uavSnD53gAc?si=-N2YsoffqMcsde4E",
			thumbnail: thumbTondemoWonders,
		},
		{
			title: "正しくなれない",
			url: "https://youtu.be/X7LQx1YL5bE?si=FxBKjum1RwQFVgjw",
			thumbnail: thumbTadashiku,
		},
		{
			title: "シルヴプレジデント",
			url: "https://youtu.be/aYUPwyV859o?si=kTseSSf41nNYmV1O",
			thumbnail: thumbSilVousPresident,
		},
		{
			title: "だめにんげんだ！",
			url: "https://youtu.be/O4UkOhQ9-qo?si=toOmOP-ZOWbWgt0z",
			thumbnail: thumbDameNingen,
		},
		{
			title: "カグヤ",
			url: "https://youtu.be/jEDUawt1svU?si=sPjmJxacS0tp8ry8",
			thumbnail: thumbKaguya,
		},
		{
			title: "ただ声一つ",
			url: "https://youtu.be/v3qhvaa-OtM?si=-EnZZ5R47wsjCTzg",
			thumbnail: thumbTadaKoe,
		},
		{
			title: "今はいいんだよ。",
			url: "https://youtu.be/4hfu_sg82xc?si=3-qTVmwTTuUXvOtd",
			thumbnail: thumbImaWa,
		},
		{
			title: "EvilBubble",
			url: "https://youtu.be/ViHXyyWoIq4?si=FjfqE5lHA9qgs9mR",
			thumbnail: thumbEvilBubble,
		},
		{
			title: "とても素敵な六月でした",
			url: "https://youtu.be/rkILCUguKfU?si=r82YhIkGJsCs6UWg",
			thumbnail: thumbTotemoSuteki,
		},
		{
			title: "ずうっといっしょ！",
			url: "https://youtu.be/AsfYKG0pNUM?si=Wlm_T-mocaZmPXqQ",
			thumbnail: thumbZutto,
		},
		{
			title: "斜陽",
			url: "https://youtu.be/X2bsEnZppnI?si=cN0HEUY9Gk90jA78",
			thumbnail: thumbShayo,
		},
		{
			title: "だきしめるまで。",
			url: "https://youtu.be/vBYRQqzzNOg?si=H6MKPw_CrIhlqJ2t",
			thumbnail: thumbDakishimeru,
		},
		{
			title: "DaisyCrown",
			url: "https://youtu.be/nJcwYAlke7Y?si=BD0ukizM3RsLb4gz",
			thumbnail: thumbDaisyCrown,
		},
		{
			title: "革命道中",
			url: "https://youtu.be/wwiKDk7Kk3I?si=9Ub8L-1vyK7cJhy0",
			thumbnail: thumbKakumei,
		},
		{
			title: "カイコ",
			url: "https://youtu.be/zqMEyLl3efY?si=vLKx59pQctRl-yKG",
			thumbnail: thumbKaiko,
		},
	] satisfies Song[],
};
