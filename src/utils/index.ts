export const getPageTitle = (pageTitle: string | unknown): string => {
	const title: string = "Ky Admin"

	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}

export const debounce = (func: () => void, wait: number): () => void => {
	let timer: any

	return function () {
		const context = this
		const args = arguments

		clearTimeout(timer)
		timer = setTimeout(function () {
			func.apply(context, args)
		}, wait)
	}
}

export const throttle = (func: () => void, wait: number): () => void => {
	let timer: any
	return function () {
		const context = this
		const args = arguments

		if (!timer) {
			timer = setTimeout(function () {
				timer = null
				func.apply(context, args)
			}, wait)
		}
	}
}
