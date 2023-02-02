import axios from 'axios'

const getServerPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5422/api/'
  } else {
    return window.location.origin + '/api'
  }
}

const path = getServerPath()
const axiosApi = axios.create({
  baseURL: path,
  // withCredentials: true,
})

axiosApi.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

axiosApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let err
    if (error.response) {
      err = {
        status: error.response.status,
        error: error.response.data.error ? error.response.data.error : error.response.data,
      }
    } else if (error.request) {
      console.log('server error', error)
    } else {
      err = error
    }
    return Promise.reject(err)
  },
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => {
    return response.data
  })
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => {
    return response.data
  })
}

export async function postFD(url, data, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => {
    return response.data
  })
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data)
}
