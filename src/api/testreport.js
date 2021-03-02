import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function saveTestreport(obj) {
  return request({
    url: BASE_URL + 'testreport/save',
    method: 'POST',
    data: obj
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'testreport/getById',
    method: 'GET',
    params: { id }
  })
}
export function changeStatus(appointmentId, status) {
  return request({
    url: BASE_URL + 'testreport/changeStatus',
    method: 'GET',
    params: { appointmentId, status }
  })
}
