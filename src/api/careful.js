import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'careful/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'careful/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function save(obj) {
  return request({
    url: BASE_URL + 'careful/save',
    method: 'POST',
    data: obj
  })
}
