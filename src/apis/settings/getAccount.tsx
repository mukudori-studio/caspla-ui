import { axiosClient } from '@/utils/axiosClient'

const getAccount = async (casplaId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/casts/logged_user`, {
      params: {
        caspla_id: casplaId
      }
    })
    return res
  } catch(err) {
    throw err
  }
}

export default getAccount
