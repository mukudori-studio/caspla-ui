import { axiosClient } from '@/utils/axiosClient'

const fanRegistration = async (data: any, thumbnail: string, role: string) => {
  try {

    const postData = {
      thumbnailImage: data.thumbnailImage,
      fullName: data.fullName,
      furigana: data.furigana,
      email: data.email,
      casplaId: data.casplaId,
      password: data.password,
      role: data.role
    }

    // const res = await axiosClient.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`, postData)
    // return res
    return
  } catch(err) {
    throw err
  }
}

export default fanRegistration