<template>
  <el-cascader :value="value" size="mini" :options="treeData" :props="props" separator="-" @change="changeValue" />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      treeData: [],
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.treeData = transListToTreeData(await getDepartment(), 0)
    },
    changeValue(list) {
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style>

</style>
