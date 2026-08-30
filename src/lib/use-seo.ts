import { useEffect } from "react";

const SITE_URL = "https://www.golfwala.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

type SeoOptions = {
	title: string;
	description: string;
	path: string;
	noindex?: boolean;
	ogImage?: string;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
	let el = document.head.querySelector<HTMLMetaElement>(
		`meta[${attr}="${key}"]`
	);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

function setCanonical(href: string) {
	let el = document.head.querySelector<HTMLLinkElement>(
		'link[rel="canonical"]'
	);
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", "canonical");
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
}

export function useSeo({
	title,
	description,
	path,
	noindex = false,
	ogImage = DEFAULT_OG_IMAGE,
}: SeoOptions) {
	useEffect(() => {
		const url = `${SITE_URL}${path}`;

		document.title = title;
		setMeta("name", "title", title);
		setMeta("name", "description", description);
		setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
		setCanonical(url);

		setMeta("property", "og:title", title);
		setMeta("property", "og:description", description);
		setMeta("property", "og:url", url);
		setMeta("property", "og:image", ogImage);

		setMeta("name", "twitter:title", title);
		setMeta("name", "twitter:description", description);
		setMeta("name", "twitter:image", ogImage);
	}, [title, description, path, noindex, ogImage]);
}
