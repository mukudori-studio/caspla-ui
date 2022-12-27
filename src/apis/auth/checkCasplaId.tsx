import { axiosClient } from '@/utils/axiosClient'

const checkCasplaId = async (casplaId: string, loggedCasplaId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/auth/check_caspla_id`, {
      params: {
        caspla_id: casplaId,
        loggedCasplaId : loggedCasplaId
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default checkCasplaId