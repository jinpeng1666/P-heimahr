<template>
  <el-dialog title="新增部门" @close="close" :visible="showDialog">
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="2-10个字符" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="请选择负责人" style="width: 80%" size="mini" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input placeholder="1-100个字符" type="textarea" :rows="4" style="width: 80%" size="mini" />
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
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
