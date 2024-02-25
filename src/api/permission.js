import request from '@/utils/request'

/**
 * 获取权限列表数据
 */
export function getPermissionList() {
  return request({
    url: '/sys/permission'
  })
}
