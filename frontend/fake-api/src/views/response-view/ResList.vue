<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-medium">返回值列表</h2>
      <div class="space-x-3">
        <ElButton type="primary" :icon="Plus" @click="$emit('add')"> 新建 </ElButton>
        <ElButton
          type="danger"
          :icon="Delete"
          :disabled="!selectedRows.length"
          @click="handleBatchDelete"
        >
          批量删除
        </ElButton>
        <ElButton
          type="warning"
          :icon="Switch"
          :disabled="!selectedRows.length"
          @click="handleBatchToggle"
        >
          批量启用/禁用
        </ElButton>
      </div>
    </div>

    <el-table :data="data" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" />
      <el-table-column label="ID" prop="id" width="80" sortable />
      <el-table-column label="别名" prop="alias" sortable />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.enable" @change="handleStatusChange(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <ElButton-group>
            <ElButton type="primary" :icon="Edit" size="small" @click.stop="handleEdit(row)" />
            <ElButton type="danger" :icon="Delete" size="small" @click.stop="handleDelete(row)" />
          </ElButton-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete, Switch, Edit } from '@element-plus/icons-vue'
import { type ResSchema } from '../../types/model'

const $emit = defineEmits<{
  add: []
  edit: [value: ResSchema]
  delete: [value: ResSchema]
  batchAdd: [value: ResSchema]
  batchEdit: [value: ResSchema]
  batchDelete: [value: ResSchema]
  statusChange: [value: ResSchema]
}>()

const { data } = defineProps<{
  data: ResSchema[]
}>()

const selectedRows = ref<ResSchema[]>([])

const handleSelectionChange = (rows: ResSchema[]) => {
  selectedRows.value = rows
}

const handleEdit = (row: ResSchema) => {
  $emit('edit', row)
}

const handleDelete = async (row: ResSchema) => {
  $emit('delete', row)
}

const handleStatusChange = (row: ResSchema) => {
  $emit('statusChange', row)
}

const handleBatchDelete = async () => {
  if (!selectedRows.value.length) return

  try {
    await ElMessageBox.confirm(`确认删除选中的 ${selectedRows.value.length} 条响应?`, '提示', {
      type: 'warning',
    })
    const ids = selectedRows.value.map((row) => row.id)
    ElMessage.success('批量删除成功')
  } catch {
    // 用户取消删除
  }
}

const handleBatchToggle = async () => {
  if (!selectedRows.value.length) return

  try {
    const enable = !selectedRows.value[0].enable
    await ElMessageBox.confirm(
      `确认${enable ? '启用' : '禁用'}选中的 ${selectedRows.value.length} 条响应?`,
      '提示',
      { type: 'warning' },
    )

    ElMessage.success(`批量${enable ? '启用' : '禁用'}成功`)
  } catch {
    // 用户取消操作
  }
}
</script>
