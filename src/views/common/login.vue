<template>
    <div class="login__container">
        <div class="box">
            <h1 class="title">Ky-Report</h1>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="0">
                <el-form-item prop="username">
                    <el-input size="large" v-model="form.username">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" size="large" v-model="form.password">
                        <template #prefix>
                            <el-icon><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/user'
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const form = reactive({
    username: "",
    password: ""
})

const rules = reactive({
    username: { required: true, message: "请输入用户名", trigger: 'blur' },
    password: { required: true, message: "请输入密码", trigger: 'blur' }
})

const formRef = ref()

const submit = async () => {
    (formRef.value).validate((valid: Boolean) => {
        if (valid) {
            store.login(form)
                .then(() => {
                    router.push('/')
                })
        }
    })
}
</script>

<style lang="scss" scoped>
.login__container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #2d3a4b;
    color: #fff;

    .box {
        margin-top: 200px;
        width: 450px;
        display: flex;
        flex-direction: column;
        text-align: center;

        .title {
            margin-bottom: 50px;
        }

        &::v-deep .el-form-item {
            margin-bottom: 25px;
        }

        .el-button {
            width: 100%;
        }
    }

    &::v-deep .el-input__prefix-inner {
        align-items: center;
    }
}
</style>