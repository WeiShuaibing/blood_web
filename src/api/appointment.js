import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getAllAppointment(status) {
  return request({
    url: BASE_URL + 'appointment/getAllAppointment',
    method: 'GET',
    params: {
      status
    }
  })
}

export function getMyBloodStatus() {
  return request({
    url: BASE_URL + 'appointment/getMyBloodStatus',
    method: 'GET'
  })
}

export function getMyBloodStatus2(id) {
  return request({
    url: BASE_URL + 'appointment/getMyBloodStatus2',
    method: 'GET',
    params: {
      userId: id
    }
  })
}

export function changeAppointmentStatus(appointmentId, status) {
  return request({
    url: BASE_URL + 'appointment/changeAppointmentStatus',
    method: 'GET',
    params: {
      appointmentId,
      status
    }
  })
}

