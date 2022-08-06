import { axiosClient } from '@/utils/axiosClient'

const checkVerify = async (code: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/auth/verify`, {
      params: {
        code: code
      }
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default checkVerify