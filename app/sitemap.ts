import type { MetadataRoute } from "next";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${process.env.SITE_URL}`,
			lastModified,
		},
	];
}
