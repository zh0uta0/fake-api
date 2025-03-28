<template>
  <div>
    <div class="api-view">
      <ElTag>{{ api.alias }} </ElTag>
      <ElTag>{{ api.method }} </ElTag>
      <ElTag>{{ api.url }} </ElTag>
    </div>
    <ElButton :icon="Plus" type="primary">添加</ElButton>

    <ElInput />

    <div class="content">
      <div class="option-row"></div>
      <div class="res-item-wrap">
        <div class="res-alist-wrap"></div>
        <div class="res-content-wrap"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import * as apiReq from '@/apis/api'
import { ref } from 'vue'
import type { Api, ApiSchema } from '@/types/model'
import { ElButton, ElInput, ElTag } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const route = useRoute()

const api = ref<ApiSchema>({
  id: 0,
  url: '',
  method: '',
  alias: '',
  responses: [],
})

initApi()

// console.log('🚀 ~ id:', id)
async function initApi() {
  const id = route.params.id as string
  if (!id) return
  const data = await apiReq.getById(parseInt(id))
  console.log('🚀 ~ initApi ~ data:', data)
  api.value = data
}
</script>

<style scoped></style>
