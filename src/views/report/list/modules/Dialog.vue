<template>
	<el-dialog v-model="dialogVisible" title="添加日报" width="600px">
		<el-form ref="formRef" :model="form" :rules="rules" label-width="60px">
			<el-form-item label="项目" prop="project">
				<el-input v-model="form.project" />
			</el-form-item>
			<el-form-item label="模块" prop="module">
				<el-input v-model="form.module" />
			</el-form-item>
			<el-form-item label="描述" prop="summary">
				<el-input v-model="form.summary" />
			</el-form-item>
			<el-form-item label="时间" prop="times">
				<el-time-select
					v-model="form.begin_time"
					class="mr-4"
					:max-time="form.end_time"
					placeholder="开始时间"
					start="09:00"
					step="00:30"
					end="20:00"
				/>
				<el-time-select
					v-model="form.end_time"
					:min-time="form.begin_time"
					placeholder="结束时间"
					start="09:00"
					step="00:30"
					end="20:00"
				/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click="submit()">保存</el-button>
				<el-button :loading="loading" @click="dialogVisible = false">取消</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose, defineEmits } from "vue"
import { saveRoport } from "@/api/report"
import { ElMessage } from "element-plus"

let dialogVisible = ref(false)
let loading = ref(false)

let form = reactive({
	id: 0,
	project: "",
	module: "",
	summary: "",
	begin_time: "",
	end_time: "",
})

const rules = reactive({
	project: { required: true, message: "请输入所属项目", trigger: "blur" },
	module: { required: true, message: "请输入所属模块", trigger: "blur" },
	summary: { required: true, message: "请输入相关描述", trigger: "blur" },
	times: {
		required: true,
		validator: (rule: any, value: any, callback: any) => {
			if (!form.begin_time || !form.end_time) {
				return callback(new Error("请选择时间"))
			}
			return callback()
		},
		trigger: "change",
	},
})

const formRef = ref()

const emit = defineEmits(["get-list"])

const init = () => {
	form.id = 0
	form.project = ""
	form.module = ""
	form.summary = ""
	dialogVisible.value = true
}

const submit = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			loading.value = true
			let params: any = {
				...form,
			}
			await saveRoport(params)
			emit("get-list")
			ElMessage.success("已保存")
			dialogVisible.value = false
			loading.value = false
		}
	})
}
defineExpose({
	init,
})
</script>

<style lang="scss" scoped>
.mr-4 {
	margin-right: 16px;
}
</style>
