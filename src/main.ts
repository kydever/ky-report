import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import { ElMessage, ElMessageBox } from "element-plus"
import * as Icons from "@element-plus/icons"
import router from "./router"
import "./permission"

import "element-plus/dist/index.css"
import "./assets/styles/reset.css"
import "./assets/styles/normalize.css"
import "./assets/styles/common.scss"

const app = createApp(App)

app.use(router)
app.use(createPinia())

Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons])
})

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm

app.mount("#app")

// 定义module 需要ts代码提示必须执行下方代码
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$message: ElMessage
		$api: Object<any>
		$confirm: ElMessageBox
	}
}
