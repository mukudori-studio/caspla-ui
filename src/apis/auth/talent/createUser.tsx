import { axiosClient } from '@/utils/axiosClient'

const createUser = async (data: any, role: string) => {
  try {

    const postData = {
      casplaId: data.casplaId,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      furigana: data.furigana,
      role: role
    }
    const res = await axiosClient.post('/api/v1/auth/save_user', postData)
    return res.data
  } catch(err) {
    throw err
  }
}

export default createUser