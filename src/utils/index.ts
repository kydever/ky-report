export const getPageTitle = (pageTitle: string | unknown): string => {
	const title: string = "Ky Admin"

	if (pageTitle) {
		return `${pageTitle} - ${title}`
	}
	return `${title}`
}

export const debounce = (func: () => void, wait: number): (() => void) => {
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

export const throttle = function (func: () => void, delay = 200) {
	let timer: any = 0
	return function fn() {
		let context = fn
		let args = arguments
		if (!timer) {
			timer = setTimeout(function () {
				func.apply(context, args)
				timer = 0
			}, delay)
		}
	}
}
