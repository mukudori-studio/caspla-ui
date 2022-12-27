import { axiosClient } from '@/utils/axiosClient'

const getAccount = async (casplaId: string) => {
  try {
    const res = await axiosClient.get(`/api/v1/casts/logged_user?caspla_id=${casplaId}`)
    return res.data
  } catch(err) {
    throw err
  }
}

export default getAccount
