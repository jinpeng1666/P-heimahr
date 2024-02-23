<template>
  <div class="container">
    <div class="app-container">
      <!-- 按钮 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义内容 -->
          <template v-slot="{ row }">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini">确定</el-button>
              <el-button size="mini">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text">分配</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total" layout="prev, pager, next" @current-change="changePage" />
      </el-row>
      <!-- 放置弹层 -->
      <el-dialog :visible.sync="showDialog" width="500px" title="新增角色" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="roleForm.name" style="width: 300px" size="mini" />
          </el-form-item>
          <!-- 如果不需要校验，就不需要写prop属性；重置表单数据，需要prop属性 -->
          <el-form-item prop="state" label="启用">
            <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
          </el-form-item>
          <el-form-item prop="description" label="角色描述">
            <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
                <el-button size="mini" @click="btnCancel">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleList, addRole } from '@/api/role'

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
      },
      roleForm: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
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
      // 添加编辑标记
      this.list.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.btnCancel()
        }
      })
    },
    btnCancel() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
