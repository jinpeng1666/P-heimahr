<template>
  <div class="container">
    <div class="app-container">
      <!-- 按钮 -->
      <div class="role-operate">
        <el-button size="mini" type="primary">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table>
        <el-table-column align="center" width="200" label="角色"></el-table-column>
        <el-table-column align="center" width="200" label="启用"></el-table-column>
        <el-table-column align="center" label="描述"></el-table-column>
        <el-table-column align="center" label="操作"></el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination layout="prev, pager, next"></el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Role'
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
