import { axiosClient } from '@/utils/axiosClient'

const checkCasplaId = async (casplaId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/auth/check_caspla_id`, {
      params: {
        username: casplaId
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default checkCasplaId