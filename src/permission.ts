import router from "./router"
import { useStore } from "./store/user"
import { ElMessage } from "element-plus"
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import { getToken } from "@/utils/auth" // get token from cookie
import { getPageTitle } from "@/utils"
import { authorize, login } from "@/api/common.ts"

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ["/404"] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// set page title
	document.title = getPageTitle(to.meta.title)

	// determine whether the user has logged in
	let hasToken = getToken()
	const store = useStore()

	if (hasToken) {
		next()
	} else {
		if (to.path === "/login") {
			const {
				query: { code },
			} = to
			await store.login(code)

			next({ path: "/dashboard" })
		} else if (whiteList.includes(to.path)) {
			next()
		} else {
			const params = { redirect_url: "https://daily-report.knowyourself.cc/login" }
			await authorize(params)
			next()
			// next({
			// path: "/login",
			// query: {
			// code: "hdOAZjDZH_mSIT0KfPrJJxIHBhiQwRGMTGCIuBEUbbE",
			// },
			// })
		}
	}
})

router.afterEach(() => {})
