import Breadcrumb from "./Breadcrumb/index.vue"
import Hamburger from "./Hamburger/index.vue"
import Pagination from "./Pagination/index.vue"
import Container from "./Container/index.vue"

export default {
	install(app: any) {
		app.component("Breadcrumb", Breadcrumb)
		app.component("Hamburger", Hamburger)
		app.component("Pagination", Pagination)
		app.component("Container", Container)
	},
}
