<template>
  <div class="api">
    <ElInput v-if="editMod" class="api-alias" :value="'半成品入库前重复性校验'" />
    <ElTag v-else class="api-alias ellipsis" type="primary" size="large"
      >半成品入库前重复性校验</ElTag
    >

    <ElInput v-if="editMod" class="api-method" :value="'GET'" />
    <ElTag v-else class="api-method" size="large">GET</ElTag>

    <ElInput
      v-if="editMod"
      class="api-url"
      :value="'/admin-api/wms/terminal/stock/queryRemiStockBeforeInRoom'"
    />
    <ElTag v-else class="api-url ellipsis" type="primary" size="large">
      /admin-api/wms/terminal/stock/queryRemiStockBeforeInRoom
    </ElTag>

    <div class="api-opt">
      <ElButton :icon="Edit" :type="editMod ? 'success' : 'primary'" @click="editMod = !editMod">
        {{ editMod ? '保存' : '修改' }}
      </ElButton>

      <ElButton :icon="Delete" type="danger">删除</ElButton>
      <ElButton :icon="Loading" type="success">返回值</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElRow, ElCol, ElButton, ElTag, ElInput } from 'element-plus'
import { Delete, Edit, Loading } from '@element-plus/icons-vue'
import { ref } from 'vue'

const editMod = ref(false)
</script>

<style scoped>
.l {
  outline: 1px solid red;
}
.api {
  display: flex;
  gap: 0.8rem;
}

.api-alias {
  width: 12rem;
  justify-content: flex-start;
}

.api-method {
  width: 4.5rem;
}

.api-url {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.api-opt {
  /* margin-left: auto; */
}

.ellipsis {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
</style>
