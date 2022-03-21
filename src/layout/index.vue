<template>
    <el-container class="layout__container">
        <el-aside :class="[commonStore.sidebar.open ? 'is-collapse' : '']">
            <Sidebar :collapse="commonStore.sidebar.open" />
        </el-aside>
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <Main />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Main from './Main.vue'
import { useStore as CommonStore } from '@/store/common'
const commonStore = CommonStore()
</script>

<style lang="scss" scoped>
.layout__container {
    height: 100vh;

    .el-aside {
        background-color: #304156;
        height: 100%;
        width: 200px;
        transition: width 0.3s;

        &.is-collapse {
            width: 64px;
        }
    }

    .el-header {
        background-color: #f0f2f5;
    }
}
</style>