import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// NOTE：Default Congig
export const axiosClient  = axios.create({
  baseURL: BaseUrl,
  paramsSerializer: (params => qs.stringify(params, { arrayFormat: 'repeat' })),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

// NOTE：Request Interceptor
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers !== undefined) {
    // TODO：必要に応じてaccessToken仕込んだりできる
    // const accessToken = getAccessToken()
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`
    // }
  }
  return config
})

// NOTE：Response Interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case 401:
        break
      default:
        break
    }
    return Promise.reject(error)
    }
)
