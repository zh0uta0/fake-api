<template>
  <!-- API信息卡片 -->
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="text-xl font-medium mb-4">{{ data.alias }}</div>

    <div class="grid grid-cols-2 gap-6">
      <div class="flex items-center">
        <span class="text-gray-600 w-24">请求方法:</span>
        <ElTag :type="tagType" size="small">
          {{ data.method.toUpperCase() }}
        </ElTag>
      </div>
      <div class="flex items-center col-span-2">
        <span class="text-gray-600 w-24">接口地址:</span>
        <span class="font-medium break-all">{{ data.url }}</span>
        <ElButton class="ml-3" type="success" link @click="handleCopyComplateUrl"
          >复制完整路径</ElButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ApiSchema, ElThemeType } from '../../types/model'
import { ElButton, ElMessage, ElTag } from 'element-plus'
import { copyToClipboard, methodTagType } from '@/libs'

defineOptions({ name: 'ApiCard' })

const { data } = defineProps<{
  data: ApiSchema
}>()

const tagType = computed(() => {
  return methodTagType(data.method) as ElThemeType
})

const handleCopyComplateUrl = async () => {
  const port = '9468'
  let origin = window.location.origin
  origin = origin.replace(window.location.port, port)
  const str = origin + data.url

  const result = await copyToClipboard(str)
  if (result) {
    ElMessage.success('复制成功')
  } else {
    ElMessage.warning('复制失败')
  }
}
</script>
