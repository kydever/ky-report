import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import * as Icons from "@element-plus/icons"
import router from "./router"
import components from "@/components"
import "./permission"

import "element-plus/dist/index.css"
import "./assets/styles/reset.css"
import "./assets/styles/normalize.css"
import "./assets/styles/common.scss"

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(components)

Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons])
})

app.mount("#app")
