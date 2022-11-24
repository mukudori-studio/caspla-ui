import { axiosClient } from '@/utils/axiosClient'

const getAccount = async (casplaId: string, accessToken: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/casts/logged_user?caspla_id=${casplaId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    })
    return res.data
  } catch(err) {
    throw err
  }
}

export default getAccount
