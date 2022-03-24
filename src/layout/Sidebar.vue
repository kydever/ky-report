<template>
    <div class="sidebar">
        <el-scrollbar>
            <el-menu
                :default-active="activeSidebar"
                background-color="#304156"
                text-color="#BFCBD9"
                unique-opened="true"
                :collapse="collapse"
                router
            >
                <template v-for="menu in menus">
                    <template v-if="menu.children">
                        <el-sub-menu :index="menu.path" :key="menu.name">
                            <template #title>
                                <el-icon>
                                    <component :is="menu.icon"></component>
                                </el-icon>
                                <span>{{ menu.name }}</span>
                            </template>
                            <el-menu-item v-for="item in menu.children" :index="item.path" :key="item.name">
                                <el-icon v-if="item.icon">
                                    <component :is="item.icon"></component>
                                </el-icon>
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="menu.path" :key="menu.name">
                            <el-icon>
                                <component :is="menu.icon"></component>
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
import { useStore } from "@/store/menu";
import { defineProps, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    collapse: Boolean
})
const { menus } = useStore()

const activeSidebar = ref('')

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