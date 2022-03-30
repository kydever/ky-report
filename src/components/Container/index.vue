<template>
	<div class="container">
		<header v-if="$slots.header" class="header">
			<slot name="header" />
		</header>
		<el-scrollbar>
			<main class="main">
				<slot />
			</main>
		</el-scrollbar>
		<footer v-if="$slots.footer" class="footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.header,
	.footer {
		padding: 15px 0;
	}

	.main {
		padding: 0 15px;
		flex-grow: 1;
		height: 100%;
		overflow: auto;
	}
}
</style>
