<template>
	<el-dialog v-model="dialogVisible" title="当日进度" width="800px" custom-class="timeline">
		<el-timeline>
			<el-timeline-item
				v-for="(item, index) in data.items"
				:key="index"
				center
				:timestamp="item.begin_time + ' - ' + item.end_time"
				placement="top"
			>
				<el-card
					:body-style="{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}"
				>
					<div class="timeline__info">
						<h4>{{ item.project }} - {{ item.module }}</h4>
						<p>{{ item.summary }}</p>
					</div>
					<div class="timeline__action">
						<el-button type="danger" @click="deleteItem(item.id, index)">删除</el-button>
					</div>
				</el-card>
			</el-timeline-item>
		</el-timeline>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, defineEmits } from "vue"
import { deleteRoport } from "@/api/report"
import { ElMessageBox, ElMessage } from "element-plus"

let dialogVisible = ref(false)

let data = reactive({
	items: [],
})

const emit = defineEmits(["get-list"])

const init = (timeline: Array<any>) => {
	data.items = [...timeline]
	dialogVisible.value = true
}

const deleteItem = async (id: number, index: number) => {
	ElMessageBox.confirm("是否确定删除该日报", "提醒", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	}).then(async () => {
		try {
			let res = await deleteRoport(id)
			if (res) {
				data.items.splice(index, 1)
				ElMessage.success("已删除")
				emit("get-list")
			} else {
				ElMessage.error("删除失败")
			}
		} catch (err) {
			ElMessage.error(`ERROR: ${err}`)
		}
	})
}
defineExpose({
	init,
})
</script>
<style lang="scss" scoped>
.timeline {
	.timeline__info {
		flex: 1;
	}

	.timeline__action {
		width: 80px;
		text-align: right;
	}

	h4 {
		margin-bottom: 10px;
		font-size: 18px;
	}
	p {
		line-height: 1.4;
	}
}
</style>
