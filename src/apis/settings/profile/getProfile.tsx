import { axiosClient } from '@/utils/axiosClient'

const getProfile = async (casplaId: string, accessToken: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/casts/get_user_details`, {
      params: {
        caspla_id: casplaId,
        loggedUser: accessToken
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default getProfile
