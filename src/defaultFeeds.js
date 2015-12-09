
let feed = (id, name, url, img) => {
	return {
		corsProxy: true,
		url,
		id,
		img,
		name
	}
}

export const defaultFeeds = [
]
