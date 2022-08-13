import { axiosClient } from '@/utils/axiosClient'

const fanRegistration = async (data: any, thumbnail: string, role: string) => {
  try {

    const postData = {
      // thumbnailImage: data.thumbnailImage,
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password
    }

    const res = await axiosClient.post('/api/v1/auth/create_fan_user', postData)
    return res
    return
  } catch(err) {
    throw err
  }
}

export default fanRegistration