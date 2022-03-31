<template>
	<div class="sidebar">
		<el-scrollbar>
			<el-menu
				:default-active="activeSidebar"
				background-color="#304156"
				text-color="#BFCBD9"
				:unique-opened="true"
				:collapse="collapse"
				:collapse-transition="collapseTransition"
				router
			>
				<template v-for="menu in menus">
					<template v-if="menu.children">
						<el-sub-menu :key="menu.name" :index="menu.path">
							<template #title>
								<el-icon>
									<component :is="menu.icon" />
								</el-icon>
								<span>{{ menu.name }}</span>
							</template>
							<el-menu-item v-for="item in menu.children" :key="item.name" :index="item.path">
								<el-icon v-if="item.icon">
									<component :is="item.icon" />
								</el-icon>
								<span>{{ item.name }}</span>
							</el-menu-item>
						</el-sub-menu>
					</template>
					<template v-else>
						<el-menu-item :key="menu.name" :index="menu.path">
							<el-icon>
								<component :is="menu.icon" />
							</el-icon>
							<span>{{ menu.name }}</span>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/menu"
import { computed, defineProps, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore as commonStore } from "@/store/common"

const props = defineProps({
	collapse: Boolean,
})
const { menus } = useStore()
const common = commonStore()
const collapseTransition = computed(() => !common.isMobile)

const activeSidebar = ref("")

const route = useRoute()

onMounted(() => {
	activeSidebar.value = route.path
})
</script>

<style lang="scss" scoped>
.el-menu {
	border-right: none;
}
</style>
