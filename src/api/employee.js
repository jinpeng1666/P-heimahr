import request from '@/utils/request'

/**
 * 获取员工列表
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 导出员工的excel
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    responseType: 'blob'
  })
}

/**
 * 下载员工导出模板
 */
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

/**
 * 上传用户的excel
 */
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 新增员工
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 获取员工详情
 */
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 更新员工
 */
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取可用角色
 */
export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}

/**
 * 分配员工角色
 */
export function assignRole(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'put',
    data
  })
}
