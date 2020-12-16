import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAllOfAddress() {
  return request({
    url: BASE_URL + 'address/getAll',
    method: 'GET'
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'address/save',
    method: 'POST',
    data: obj
  })
}
