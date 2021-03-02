import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'xueku/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

