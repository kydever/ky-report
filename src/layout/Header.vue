<template>
	<div class="header">
		<div class="header__left">
			<Hamburger />

			<Breadcrumb />
		</div>

		<el-dropdown trigger="click">
			<el-icon style="margin-right: 8px; margin-top: 1px">
				<setting />
			</el-icon>
			<span>{{ user.name || "Admin" }}</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>登出</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup lang="ts">
import { useStore as userStore } from "@/store/user"
const user = userStore()
</script>

<style lang="scss" scoped>
.header {
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	.header__left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
</style>
