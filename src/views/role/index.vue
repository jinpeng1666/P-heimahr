<template>
  <div class="container">
    <div class="app-container">
      <!-- 按钮 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义内容 -->
          <template v-slot="{ row }">
            <span>{{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template>
            <el-button size="mini" type="text">分配</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total" layout="prev, pager, next" @current-change="changePage" />
      </el-row>
      <!-- 放置弹层 -->
      <el-dialog width="500px" :visible.sync="showDialog" title="新增角色">
        <el-form label-width="120px">
          <el-form-item label="角色名称">
            <el-input style="width: 300px" size="mini" />
          </el-form-item>
          <el-form-item label="启用">
            <el-switch size="mini" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" :rows="3" style="width: 300px" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-button size="mini" type="primary">确定</el-button>
                <el-button size="mini">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      list: [],
      showDialog: false,
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
