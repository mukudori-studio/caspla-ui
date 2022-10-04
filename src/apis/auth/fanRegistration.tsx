import { axiosClient } from '@/utils/axiosClient'

const fanRegistration = async (data: any, thumbnail?: string) => {
  try {

    const postData = {
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password,
      role: 'FAN_USER'
    }

    const res = await axiosClient.post('/api/v1/auth/save_user', postData)
    return res
  } catch(err) {
    throw err
  }
}

export default fanRegistration