import { onBeforeMount, onMounted, onBeforeUnmount } from "vue"
import { useStore } from "@/store/common"

const { body } = document
const WIDTH = 992

export default function resizeSetup() {
	const store = useStore()

	onBeforeMount(() => {
		window.addEventListener("resize", $_handleResize)
	})

	onBeforeUnmount(() => {
		window.removeEventListener("resize", $_handleResize)
	})

	onMounted(() => {
		const isMobile = $_isMoblie()
		if (isMobile) {
			store.toggleDevice("mobile")
			store.closeSideBar()
		}
	})

	const $_handleResize = () => {
		const isMobile = $_isMoblie()
		store.toggleDevice(isMobile ? "mobile" : "desktop")
		if (isMobile) store.closeSideBar()
	}

	const $_isMoblie = () => {
		const rect = body.getBoundingClientRect()
		return rect.width - 1 < WIDTH
	}
}
