<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <ElIcon :size="30" @click="router.back()"><Back /></ElIcon>

    <!-- Api卡片 -->
    <ApiCard :data="api" />

    <!-- Response列表 -->
    <ResList
      :data="resList"
      @add="onAdd"
      @edit="onEdit"
      @delete="onDelete"
      @status-change="onStatusChange"
    />

    <!-- Content编辑抽屉 -->
    <ResEditor
      v-model="formData"
      v-model:visible="draw.visible"
      :title="draw.title"
      @confirm="onDrawConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElIcon, ElMessage, ElMessageBox } from 'element-plus'
import { Back } from '@element-plus/icons-vue'

import ApiCard from './ApiCard.vue'
import ResList from './ResList.vue'
import ResEditor from './ResEditor.vue'
import { type ApiSchema, type ResSchema } from '@/types/model'
import { useRoute, useRouter } from 'vue-router'

import { get as getApi } from '@/apis/api'
import * as reqRes from '@/apis/res'

const route = useRoute()
const router = useRouter()

const api = ref<ApiSchema>({
  id: 0,
  url: '',
  method: 'get',
  alias: '',
})

// 模拟数据
const resList = ref<ResSchema[]>([])

const draw = ref({
  visible: false,
  title: '编辑',
})

const formData = ref<ResSchema>({
  id: 0,
  content: '',
  alias: '',
  enable: true,
  apiId: 0,
})

const onAdd = () => {
  formData.value = {
    apiId: api.value.id,
    id: 0,
    content: '',
    alias: '',
    enable: true,
  }
  draw.value.title = '创建返回值'
  draw.value.visible = true
}

initApi()

const onEdit = (value: ResSchema) => {
  console.log('🚀 ~ onEdit ~ value:', value)
  formData.value = value
  draw.value.title = '修改返回值'
  draw.value.visible = true
}

const onDelete = async (value: ResSchema) => {
  await ElMessageBox.confirm('确定删除吗', { type: 'warning' })
  await reqRes.remove(value.id)
  initApi()
  ElMessage.success('删除成功')
}

const onStatusChange = async (value: ResSchema) => {
  await updateRes(value)
}

const onDrawConfirm = async () => {
  if (!formData.value.id) {
    // 创建
    await createRes(formData.value)
  } else {
    // 修改
    await updateRes(formData.value)
  }

  initApi()
}

async function initApi() {
  const id = route.params.id as any as string
  if (!id) return

  const data = await getApi(parseInt(id))
  api.value = data
  resList.value = data.responses?.reverse() ?? []
}

async function createRes(res: ResSchema) {
  const { id, ...resNoId } = res
  await reqRes.create(resNoId)
  ElMessage.success('创建成功')
}

async function updateRes(res: ResSchema) {
  await reqRes.update(res)
  ElMessage.success('修改成功')
}
</script>

<style scoped>
.el-drawer__body {
  padding: 0;
}
</style>
