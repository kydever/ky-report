<template>
	<el-pagination
		v-model:currentPage="page"
		v-model:page-size="limit"
		:page-sizes="pageSizes"
		:layout="layout"
		:total="total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	/>
</template>

<script setup lang="ts">
import { defineProps, watch, defineEmits } from "vue"

const props = defineProps({
	total: {
		type: Number,
		required: true,
	},
	page: {
		type: Number,
		default: 1,
	},
	limit: {
		type: Number,
		default: 20,
	},
	pageSizes: {
		type: Array,
		default() {
			return [20, 50, 80, 100]
		},
	},
	layout: {
		type: String,
		default: "total, sizes, prev, pager, next, jumper",
	},
})

const emit = defineEmits(["update:page", "update:limit", "pagination"])

watch(
	() => props.page,
	(newVal, oldVal) => {
		emit("update:page", newVal)
	}
)

watch(
	() => props.limit,
	(newVal, oldVal) => {
		emit("update:limit", newVal)
	}
)

const handleSizeChange = (val: number) => {
	emit("pagination", { page: props.page, limit: val })
}

const handleCurrentChange = (val: number) => {
	emit("pagination", { page: val, limit: props.limit })
}
</script>
