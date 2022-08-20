import { axiosClient } from '@/utils/axiosClient'

const signIn = async (data: any) => {
  try {

    const postData = {
      casplaId: data.casplaId,
      password: data.password
    }

    const res = await axiosClient.post(`/api/v1/auth/signin`, postData)
    return res
  } catch(err) {
    throw err
  }
}

export default signIn